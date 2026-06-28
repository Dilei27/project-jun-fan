import json
from pathlib import Path
from datetime import datetime, timedelta

from django.shortcuts import render
from django.http import Http404, JsonResponse
from django.views.decorators.csrf import csrf_exempt


def _load_json(filename):
    path = Path(__file__).resolve().parent.parent / 'content' / filename
    return json.loads(path.read_text())


def _get_pageviews(request):
    session = request.session
    if 'pageviews' not in session:
        session['pageviews'] = []
    return session['pageviews']


def _track_pageview(request, page):
    views = _get_pageviews(request)
    views.append({'page': page, 'time': datetime.now().isoformat()})
    if len(views) > 500:
        views = views[-500:]
    request.session['pageviews'] = views
    request.session.modified = True


def home(request):
    products = _load_json('products.json')
    projects = _load_json('projects.json')
    timeline = _load_json('timeline.json')
    decisions = _load_json('decisions.json')
    _track_pageview(request, 'home')
    return render(request, 'core/home.html', {
        'products': products,
        'projects': projects,
        'timeline': timeline,
        'decisions': decisions,
    })


def hub(request):
    products = _load_json('products.json')
    _track_pageview(request, 'hub')
    return render(request, 'core/hub.html', {
        'products': products,
    })


def product_detail(request, product_id):
    products = _load_json('products.json')
    product = next((p for p in products if p['id'] == product_id), None)
    if not product:
        raise Http404('Produto não encontrado')
    product = dict(product)
    product['flow_nodes'] = [n.strip() for n in product.get('architectureFlow', '').split('->')]
    _track_pageview(request, f'produto:{product_id}')
    return render(request, 'core/product_detail.html', {'product': product})


def product_dashboard(request, product_id):
    products = _load_json('products.json')
    product = next((p for p in products if p['id'] == product_id), None)
    if not product:
        raise Http404('Produto não encontrado')
    _track_pageview(request, f'dashboard:{product_id}')
    return render(request, 'core/product_dashboard.html', {'product': product})


def product_demo(request, product_id):
    products = _load_json('products.json')
    product = next((p for p in products if p['id'] == product_id), None)
    if not product:
        raise Http404('Produto não encontrado')
    _track_pageview(request, f'demo:{product_id}')
    return render(request, 'core/product_demo.html', {'product': product})


def project_detail(request, project_id):
    projects = _load_json('projects.json')
    project = next((p for p in projects if p['id'] == project_id), None)
    if not project:
        raise Http404('Projeto não encontrado')
    decisions = _load_json('decisions.json')
    _track_pageview(request, f'projeto:{project_id}')
    return render(request, 'core/project_detail.html', {
        'project': project,
        'decisions': decisions,
    })


def docs_index(request):
    docs = _load_json('docs.json')
    _track_pageview(request, 'docs')
    return render(request, 'core/docs_index.html', {'docs': docs})


def doc_detail(request, doc_id):
    docs = _load_json('docs.json')
    doc = next((d for d in docs if d['id'] == doc_id), None)
    if not doc:
        raise Http404('Documento não encontrado')
    _track_pageview(request, f'docs:{doc_id}')
    return render(request, 'core/doc_detail.html', {'doc': doc, 'docs': docs})


def decisions_page(request):
    decisions = _load_json('decisions.json')
    _track_pageview(request, 'decisoes')
    return render(request, 'core/decisions.html', {'decisions': decisions})


def framework(request):
    _track_pageview(request, 'framework')
    return render(request, 'core/framework.html')


def search(request):
    q = request.GET.get('q', '').strip()
    results = []
    if q:
        ql = q.lower()
        products = _load_json('products.json')
        projects = _load_json('projects.json')
        docs = _load_json('docs.json')
        decisions = _load_json('decisions.json')
        for p in products:
            text = json.dumps(p, ensure_ascii=False).lower()
            if ql in text:
                results.append({'type': 'produto', 'title': p['name'], 'desc': p['shortDescription'], 'url': f'/produto/{p["id"]}/', 'accent': p.get('accentColor', '#4F8CFF')})
        for p in projects:
            text = json.dumps(p, ensure_ascii=False).lower()
            if ql in text:
                results.append({'type': 'projeto', 'title': p['title'], 'desc': p.get('context', ''), 'url': f'/projeto/{p["id"]}/', 'accent': '#4F8CFF'})
        for d in docs:
            text = json.dumps(d, ensure_ascii=False).lower()
            if ql in text:
                results.append({'type': 'documentação', 'title': d['title'], 'desc': d.get('description', ''), 'url': f'/docs/{d["id"]}/', 'accent': '#EAB308'})
        for d in decisions:
            text = json.dumps(d, ensure_ascii=False).lower()
            if ql in text:
                results.append({'type': 'decisão', 'title': d['decision'], 'desc': d.get('context', ''), 'url': '/decisoes/', 'accent': '#A855F7'})
    _track_pageview(request, f'busca:{q}')
    return render(request, 'core/search.html', {'query': q, 'results': results})


def search_api(request):
    q = request.GET.get('q', '').strip()
    results = []
    if q:
        ql = q.lower()
        for item in _load_json('products.json'):
            if ql in json.dumps(item, ensure_ascii=False).lower():
                results.append({'type': 'produto', 'title': item['name'], 'url': f'/produto/{item["id"]}/'})
        for item in _load_json('projects.json'):
            if ql in json.dumps(item, ensure_ascii=False).lower():
                results.append({'type': 'projeto', 'title': item['title'], 'url': f'/projeto/{item["id"]}/'})
        for item in _load_json('docs.json'):
            if ql in json.dumps(item, ensure_ascii=False).lower():
                results.append({'type': 'documentação', 'title': item['title'], 'url': f'/docs/{item["id"]}/'})
    return JsonResponse({'results': results[:10]})


@csrf_exempt
def ai_ask(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Método não permitido'}, status=405)
    import json as j
    body = j.loads(request.body)
    question = body.get('question', '').lower().strip()
    responses = {
        'robot': 'O projeto <strong>Automação ERP UAU</strong> usou Robot Framework para automatizar regressões em ERP legado. <a href="/projeto/automacao-erp-uau/" style="color:var(--color-accent-qa);">Ver detalhes →</a>',
        'vigilante': 'O <strong>Vigilante AI</strong> é um sistema de monitoramento com classificação de eventos por IA. <a href="/produto/vigilante-ai/" style="color:var(--color-accent-qa);">Ver produto →</a>',
        'whatsapp': 'O <strong>WhatsApp AI Assistant</strong> automatiza atendimento no WhatsApp com LangChain e GPT. <a href="/produto/whatsapp-ai/" style="color:var(--color-accent-qa);">Ver produto →</a>',
        'arquitetura': 'Stack: Django + PostgreSQL. Decisões em <a href="/decisoes/" style="color:var(--color-accent-qa);">Decisões Técnicas →</a>',
        'tecnolog': 'Python, Django, Robot Framework, Playwright, LangChain, OpenCV. <a href="/produto/qa-command-center/" style="color:var(--color-accent-qa);">Ver produtos →</a>',
        'começar': 'Setup em <a href="/docs/setup/" style="color:var(--color-accent-qa);">Setup e Ambiente →</a>',
        'framework': 'O Robot/QA AI Framework unifica automação de testes com IA. <a href="/framework/" style="color:var(--color-accent-qa);">Saiba mais →</a>',
    }
    answer = 'Pergunte sobre Robot Framework, Vigilante AI, WhatsApp AI, stack, tecnologias ou framework.'
    for key, resp in responses.items():
        if key in question:
            answer = resp
            break
    _track_pageview(request, f'ai-ask:{question[:30]}')
    return JsonResponse({'answer': answer})


def analytics(request):
    views = _get_pageviews(request)
    total = len(views)
    pages = {}
    for v in views:
        p = v['page']
        pages[p] = pages.get(p, 0) + 1
    top_pages = sorted(pages.items(), key=lambda x: -x[1])[:10]
    _track_pageview(request, 'analytics')
    return render(request, 'core/analytics.html', {
        'total_views': total,
        'top_pages': top_pages,
    })


def health(request):
    from django.http import HttpResponse
    return HttpResponse('ok', content_type='text/plain')
