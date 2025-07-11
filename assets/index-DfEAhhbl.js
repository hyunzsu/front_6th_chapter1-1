(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e){if(t.type!==`childList`)continue;for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();const e=`modulepreload`,t=function(e){return`/front_6th_chapter1-1/`+e},n={},r=function(r,i,a){let o=Promise.resolve();if(i&&i.length>0){let r=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}o=l(i.map(i=>{if(i=t(i,a),i in n)return;n[i]=!0;let o=i.endsWith(`.css`),s=o?`[rel="stylesheet"]`:``,l=!!a;if(l)for(let e=r.length-1;e>=0;e--){let t=r[e];if(t.href===i&&(!o||t.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${i}"]${s}`))return;let u=document.createElement(`link`);if(u.rel=o?`stylesheet`:e,o||(u.as=`script`),u.crossOrigin=``,u.href=i,c&&u.setAttribute(`nonce`,c),document.head.appendChild(u),o)return new Promise((e,t)=>{u.addEventListener(`load`,e),u.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${i}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(e=>{for(let t of e||[]){if(t.status!==`rejected`)continue;s(t.reason)}return r().catch(s)})},i=(e,t)=>{let n=t,r=[],i=()=>n,a=t=>{console.log(`🚀 Action:`,t.type,t.payload),n=e(n,t),r.forEach(e=>e())},o=e=>(r.push(e),()=>{let t=r.indexOf(e);t>-1&&r.splice(t,1)});return{getState:i,dispatch:a,subscribe:o}},a={SET_LOADING:`SET_LOADING`,SET_PRODUCTS:`SET_PRODUCTS`,SET_LOADING_MORE:`SET_LOADING_MORE`,APPEND_PRODUCTS:`APPEND_PRODUCTS`,SET_CATEGORIES:`SET_CATEGORIES`,SET_ROUTE:`SET_ROUTE`,SET_PRODUCT_DETAIL:`SET_PRODUCT_DETAIL`,SET_PRODUCT_DETAIL_LOADING:`SET_PRODUCT_DETAIL_LOADING`,ADD_TO_CART:`ADD_TO_CART`,REMOVE_FROM_CART:`REMOVE_FROM_CART`,CLEAR_CART:`CLEAR_CART`},o={setLoading:e=>({type:a.SET_LOADING,payload:e}),setProducts:(e,t)=>({type:a.SET_PRODUCTS,payload:{products:e,total:t}}),setLoadingMore:e=>({type:a.SET_LOADING_MORE,payload:e}),appendProducts:(e,t)=>({type:a.APPEND_PRODUCTS,payload:{products:e,pagination:t}}),setCategories:e=>({type:a.SET_CATEGORIES,payload:e}),setRoute:e=>({type:a.SET_ROUTE,payload:e}),setProductDetail:e=>({type:a.SET_PRODUCT_DETAIL,payload:e}),setProductDetailLoading:e=>({type:a.SET_PRODUCT_DETAIL_LOADING,payload:e}),addToCart:e=>({type:a.ADD_TO_CART,payload:{productId:e}}),removeFromCart:e=>({type:a.REMOVE_FROM_CART,payload:{productId:e}}),clearCart:()=>({type:a.CLEAR_CART,payload:{}})},s={products:[],total:0,loading:!1,categories:{},isLoadingMore:!1,isInitialLoad:!0,pagination:{currentPage:1,hasNext:!0,limit:20},route:{name:`ProductList`,path:`/`,params:{}},productDetail:null,productDetailLoading:!1,cart:[]},c=(e=s,t)=>{switch(t.type){case a.SET_LOADING:return{...e,loading:t.payload};case a.SET_PRODUCTS:return{...e,products:t.payload.products,total:t.payload.total,loading:!1,isInitialLoad:!1,pagination:{...e.pagination,currentPage:1,hasNext:t.payload.products.length<t.payload.total}};case a.SET_LOADING_MORE:return{...e,isLoadingMore:t.payload};case a.APPEND_PRODUCTS:{let n=[...e.products,...t.payload.products];return{...e,products:n,pagination:{...e.pagination,currentPage:t.payload.pagination.page,hasNext:t.payload.pagination.hasNext??n.length<e.total},isLoadingMore:!1}}case a.SET_CATEGORIES:return{...e,categories:t.payload};case a.SET_ROUTE:return{...e,route:t.payload};case a.SET_PRODUCT_DETAIL:return{...e,productDetail:t.payload,productDetailLoading:!1};case a.SET_PRODUCT_DETAIL_LOADING:return{...e,productDetailLoading:t.payload};case a.ADD_TO_CART:{let{productId:n}=t.payload;return e.cart.includes(n)?e:{...e,cart:[...e.cart,n]}}case a.REMOVE_FROM_CART:{let{productId:n}=t.payload;return{...e,cart:e.cart.filter(e=>e!==n)}}case a.CLEAR_CART:return{...e,cart:[]};default:return e}};async function l(e={}){let{limit:t=20,search:n=``,category1:r=``,category2:i=``,sort:a=`price_asc`}=e,o=e.current??e.page??1,s=new URLSearchParams({page:o.toString(),limit:t.toString(),...n&&{search:n},...r&&{category1:r},...i&&{category2:i},sort:a}),c=await fetch(`/api/products?${s}`);return await c.json()}async function u(e){let t=await fetch(`/api/products/${e}`);return await t.json()}async function d(){let e=await fetch(`/api/categories`);return await e.json()}const f={limit:20,current:1,sort:`price_asc`,search:``},p=(e=f)=>{let t=new URL(window.location),n={};return Object.keys(e).forEach(r=>{let i=t.searchParams.get(r);if(i!==null){let t=e[r];typeof t==`number`?n[r]=parseInt(i)||t:n[r]=i}else n[r]=e[r]}),n},m=(e,t=f,n)=>{let r=new URL(window.location);Object.entries(e).forEach(([e,t])=>{t!=null&&t!==``?r.searchParams.set(e,t):r.searchParams.delete(e)}),window.history.pushState({},``,r),n&&n(p(t))};function h(e,t,n={}){let{replace:r=!1,callback:i}=n;if(m({[e]:t},f,i),r){let e=new URL(window.location);window.history.replaceState({},``,e)}}function g(e){m({...e,current:1},f)}const _=e=>{let t=async()=>{let{dispatch:t}=e;try{t(o.setLoading(!0));let e=p(),{products:n,pagination:r}=await l({...e,page:1});t(o.setProducts(n,r.total))}catch(e){console.error(`상품 로딩 실패:`,e),t(o.setLoading(!1))}},n=async()=>{let{dispatch:t,getState:n}=e,r=n();if(!(r.isLoadingMore||!r.pagination.hasNext||r.loading))try{t(o.setLoadingMore(!0));let e=p(),n=e.current+1,i={...e,page:n},{products:a,pagination:s}=await l(i),c={...s,hasNext:s.hasNext??r.products.length+a.length<s.total};t(o.appendProducts(a,c)),h(`current`,n,{replace:!0})}catch(e){console.error(`추가 상품 로딩 실패:`,e),t(o.setLoadingMore(!1))}},r=async t=>{let{dispatch:n}=e;try{n(o.setProductDetailLoading(!0));let e=await u(t);n(o.setProductDetail(e))}catch(e){console.error(`상품 상세 로딩 실패:`,e),n(o.setProductDetailLoading(!1))}},i=async()=>{let{dispatch:t}=e;try{let e=await d();t(o.setCategories(e))}catch(e){console.error(`카테고리 로딩 실패:`,e)}};return{loadProducts:t,loadMoreProducts:n,loadCategories:i,loadProductDetail:r}},v=`/front_6th_chapter1-1`,y=(e=window.location.pathname)=>e.startsWith(v)?e.slice(21)||`/`:e,b=e=>v+e,x=(e,t)=>{let{dispatch:n}=e,{productService:r}=t,i=()=>y(),a={"/":`ProductList`,"/products":`ProductList`,"/product/:id":`ProductDetail`,"/cart":`Cart`},s=()=>{let e=i();if(a[e])return{name:a[e],params:{}};for(let[t,n]of Object.entries(a))if(t.includes(`:`)){let r=t.split(`/`),i=e.split(`/`);if(r.length===i.length){let e=r.every((e,t)=>e.startsWith(`:`)||e===i[t]);if(e){let e={};return r.forEach((t,n)=>{if(t.startsWith(`:`)){let r=t.slice(1);e[r]=i[n]}}),{name:n,params:e}}}}return{name:`NotFound`,params:{}}},c=async()=>{let e=s();n(o.setRoute({name:e.name,path:i(),params:e.params})),e.name===`ProductList`?(await r.loadCategories(),await r.loadProducts()):e.name===`ProductDetail`&&e.params.id&&await r.loadProductDetail(e.params.id)},l=e=>{let t=b(e);window.history.pushState(null,null,t),c()},u=()=>{window.addEventListener(`popstate`,c),c()};return{navigate:l,init:u,getPath:i,getTarget:s}},S=()=>`
    <footer class="bg-white shadow-sm sticky bottom-0 z-40">
      <div class="max-w-md mx-auto py-8 text-center text-gray-500">
        <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
      </div>
    </footer>
  `,C=({title:e=`쇼핑몰`,showBackButton:t=!1,cartCount:n=0})=>`
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-md mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            ${t?`
              <button onclick="window.history.back()" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
            `:``}
            <h1 class="text-xl font-bold text-gray-900">
              ${t?e:`<a href="/" data-link="">${e}</a>`}
            </h1>
          </div>
          <div class="flex items-center space-x-2">
            <!-- 장바구니 아이콘 -->
            <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
              </svg>
              ${n>0?`<span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">${n}</span>`:``}
            </button>
          </div>
        </div>
      </div>
    </header>
  `,w=`
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
    <div class="aspect-square bg-gray-200"></div>
    <div class="p-3">
      <div class="h-4 bg-gray-200 rounded mb-2"></div>
      <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
      <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
      <div class="h-8 bg-gray-200 rounded"></div>
    </div>
  </div>
`,T=w.repeat(20),E=e=>`
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card" data-product-id="${e.productId}">
      <!-- 상품 이미지 -->
      <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image">
        <img src="${e.image}"
            alt="${e.title}"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            loading="lazy">
      </div>
      <!-- 상품 정보 -->
      <div class="p-3">
        <div class="cursor-pointer product-info mb-3">
          <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
            ${e.title}
          </h3>
          <p class="text-xs text-gray-500 mb-2">${e.brand}</p>
          <p class="text-lg font-bold text-gray-900">
          ${parseInt(e.lprice||0).toLocaleString()}원
          </p>
        </div>
        <!-- 장바구니 버튼 -->
        <button class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md
              hover:bg-blue-700 transition-colors add-to-cart-btn" data-product-id="${e.productId}">
          장바구니 담기
        </button>
      </div>
    </div>
  `,D=e=>`
    <button data-category1="${e}" class="category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors
      bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
      ${e}
    </button>
  `,O=({searchTerm:e})=>`
    <div class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
      <p class="text-gray-600 mb-4">"${e}"에 대한 상품을 찾을 수 없습니다.</p>
      <button onclick="window.location.href='/'" class="text-blue-600 hover:text-blue-800 text-sm">
        전체 상품 보기
      </button>
    </div>
  `,k=({isLoadingMore:e,hasNext:t,isInitialLoad:n})=>n?``:!t&&!e?`
      <div class="text-center py-8 text-sm text-gray-500">
        모든 상품을 확인했습니다
      </div>
    `:e?`
      <div class="text-center py-4">
        <div class="inline-flex items-center">
          <svg class="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-sm text-gray-600">상품을 불러오는 중...</span>
        </div>
      </div>
    `:`
    <div id="scroll-sentinel" style="height: 1px; margin-top: -1px;"></div>
  `,A=({products:e=[],total:t=0,loading:n=!1,categories:r={},isLoadingMore:i=!1,pagination:a={hasNext:!0},isInitialLoad:o=!1,cart:s=[]})=>{let c=Object.keys(r),l=p(),u=s.length,d=l.search.length>0,f=!n&&d&&e.length===0;return`
    <div class="min-h-screen bg-gray-50">
      ${C({cartCount:u})}
    <main class="max-w-md mx-auto px-4 py-4">
      <!-- 검색 및 필터 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <!-- 검색창 -->
        <div class="mb-4">
          <div class="relative">
            <input type="text" id="search-input" placeholder="상품명을 검색해보세요..." 
                   value="${l.search}" 
                   class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        <!-- 필터 옵션 -->
        <div class="space-y-3">
          <!-- 카테고리 필터 -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">카테고리:</label>
              <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
            </div>
            <!-- 1depth 카테고리 -->
            <div class="flex flex-wrap gap-2">
              ${n?`<div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>`:c.map(D).join(``)}
            </div>
            <!-- 2depth 카테고리 -->
          </div>
          <!-- 기존 필터들 -->
          <div class="flex gap-2 items-center justify-between">
            <!-- 페이지당 상품 수 -->
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">개수:</label>
              <select id="limit-select"
                      class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="10" ${l.limit===10?`selected`:``}>10개</option>
                <option value="20" ${l.limit===20?`selected`:``}>20개</option>
                <option value="50" ${l.limit===50?`selected`:``}>50개</option>
                <option value="100" ${l.limit===100?`selected`:``}>100개</option>
              </select>
            </div>
            <!-- 정렬 -->
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">정렬:</label>
              <select id="sort-select" class="text-sm border border-gray-300 rounded px-2 py-1
                          focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="price_asc" ${l.sort===`price_asc`?`selected`:``}>가격 낮은순</option>
                <option value="price_desc" ${l.sort===`price_desc`?`selected`:``}>가격 높은순</option>
                <option value="name_asc" ${l.sort===`name_asc`?`selected`:``}>이름순</option>
                <option value="name_desc" ${l.sort===`name_desc`?`selected`:``}>이름 역순</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <!-- 상품 목록 -->
      <div class="mb-6">
        <div>
          <!-- 상품 개수 정보 -->
          ${n?``:`
            <div class="mb-4 text-sm text-gray-600">
              ${`총 <span class="font-medium text-gray-900">${t}개</span>의 상품`}
            </div>
            `}
          <!-- 상품 그리드 -->
          ${f?O({searchTerm:l.search}):`
              <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
                ${n?T:e.map(E).join(``)}
              </div>
              
              <!-- 무한스크롤 로더 또는 센티넬 -->
              ${n?``:k({isLoadingMore:i,hasNext:a.hasNext,isInitialLoad:o})}
            `}
        </div>
      </div>
    </main>
    ${S()}
  </div>
  `},j=({product:e=null,cart:t=[]})=>{let n=t.length;return`
     <div class="min-h-screen bg-gray-50">
     ${C({title:`상품 상세`,showBackButton:!0,cartCount:n})}
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 브레드크럼 -->
        <nav class="mb-4">
          <div class="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" data-link="" class="hover:text-blue-600 transition-colors">홈</a>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <button class="breadcrumb-link" data-category1="${e?.category1||`생활/건강`}">
              ${e?.category1||`생활/건강`}
            </button>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <button class="breadcrumb-link" data-category2="${e?.category2||`생활용품`}">
              ${e?.category2||`생활용품`}
            </button>
          </div>
        </nav>
        <!-- 상품 상세 정보 -->
        <div class="bg-white rounded-lg shadow-sm mb-6">
          <!-- 상품 이미지 -->
          <div class="p-4">
            <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img src="${e?.image||`https://shopping-phinf.pstatic.net/main_8506721/85067212996.1.jpg`}" alt="${e?.title||`PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장`}" class="w-full h-full object-cover product-detail-image">
            </div>
            <!-- 상품 정보 -->
            <div>
              <p class="text-sm text-gray-600 mb-1">${e?.brand||e?.mallName||``}</p>
              <h1 class="text-xl font-bold text-gray-900 mb-3">${e?.title||`PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장`}</h1>
              <!-- 평점 및 리뷰 -->
              <div class="flex items-center mb-3">
                <div class="flex items-center">
                  ${[,,,,,].fill(0).map((t,n)=>`
                    <svg class="w-4 h-4 ${n<Math.floor(e?.rating||4)?`text-yellow-400`:`text-gray-300`}" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  `).join(``)}
                </div>
                <span class="ml-2 text-sm text-gray-600">${e?.rating||4}.0 (${(e?.reviewCount||749).toLocaleString()}개 리뷰)</span>
              </div>
              <!-- 가격 -->
              <div class="mb-4">
                <span class="text-2xl font-bold text-blue-600">${parseInt(e?.lprice||220).toLocaleString()}원</span>
              </div>
              <!-- 재고 -->
              <div class="text-sm text-gray-600 mb-4">
                재고 ${(e?.stock||107).toLocaleString()}개
              </div>
              <!-- 설명 -->
              <div class="text-sm text-gray-700 leading-relaxed mb-6">
                ${e?.description||`${e?.title||`PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장`}에 대한 상세 설명입니다. 브랜드의 우수한 품질을 자랑하는 상품으로, 고객 만족도가 높은 제품입니다.`}
              </div>
            </div>
          </div>
          <!-- 수량 선택 및 액션 -->
          <div class="border-t border-gray-200 p-4">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-medium text-gray-900">수량</span>
              <div class="flex items-center">
                <button id="quantity-decrease" class="w-8 h-8 flex items-center justify-center border border-gray-300 
                   rounded-l-md bg-gray-50 hover:bg-gray-100">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                  </svg>
                </button>
                <input type="number" id="quantity-input" value="1" min="1" max="${e?.stock||107}" class="w-16 h-8 text-center text-sm border-t border-b border-gray-300 
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <button id="quantity-increase" class="w-8 h-8 flex items-center justify-center border border-gray-300 
                   rounded-r-md bg-gray-50 hover:bg-gray-100">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
              </div>
            </div>
            <!-- 액션 버튼 -->
            <button id="add-to-cart-btn" data-product-id="${e?.productId||`85067212996`}" class="w-full bg-blue-600 text-white py-3 px-4 rounded-md 
                 hover:bg-blue-700 transition-colors font-medium">
              장바구니 담기
            </button>
          </div>
        </div>
        <!-- 상품 목록으로 이동 -->
        <div class="mb-6">
          <button class="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md 
            hover:bg-gray-200 transition-colors go-to-product-list">
            상품 목록으로 돌아가기
          </button>
        </div>
        <!-- 관련 상품 -->
        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-4 border-b border-gray-200">
            <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
            <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
          </div>
          <div class="p-4">
            <div class="grid grid-cols-2 gap-3 responsive-grid">
              <div class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer" data-product-id="86940857379">
                <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                  <img src="https://shopping-phinf.pstatic.net/main_8694085/86940857379.1.jpg" alt="샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이" class="w-full h-full object-cover" loading="lazy">
                </div>
                <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이</h3>
                <p class="text-sm font-bold text-blue-600">230원</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer" data-product-id="82094468339">
                <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                  <img src="https://shopping-phinf.pstatic.net/main_8209446/82094468339.4.jpg" alt="실리카겔 50g 습기제거제 제품 /산업 신발 의류 방습제" class="w-full h-full object-cover" loading="lazy">
                </div>
                <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">실리카겔 50g 습기제거제 제품 /산업 신발 의류 방습제</h3>
                <p class="text-sm font-bold text-blue-600">280원</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      ${S()}
    </div>
  `},M=()=>`
<main class="max-w-md mx-auto px-4 py-4">
  <div class="text-center my-4 py-20 shadow-md p-6 bg-white rounded-lg">
  <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#4285f4;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1a73e8;stop-opacity:1" />
      </linearGradient>
      <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="2" stdDeviation="8" flood-color="#000000" flood-opacity="0.1"/>
      </filter>
    </defs>
    
    <!-- 404 Numbers -->
    <text x="160" y="85" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="48" font-weight="600" fill="url(#blueGradient)" text-anchor="middle">404</text>
    
    <!-- Icon decoration -->
    <circle cx="80" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
    <circle cx="240" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
    <circle cx="90" cy="45" r="2" fill="#4285f4" opacity="0.5"/>
    <circle cx="230" cy="45" r="2" fill="#4285f4" opacity="0.5"/>
    
    <!-- Message -->
    <text x="160" y="110" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="14" font-weight="400" fill="#5f6368" text-anchor="middle">페이지를 찾을 수 없습니다</text>
    
    <!-- Subtle bottom accent -->
    <rect x="130" y="130" width="60" height="2" rx="1" fill="url(#blueGradient)" opacity="0.3"/>
  </svg>
  
  <a href="/" data-link class="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">홈으로</a>
</div>
</main>
`;let N=null,P=!1;const F=e=>{P||(document.addEventListener(`click`,t=>{let n=t.target.closest(`a`);if(n){let r=n.getAttribute(`href`);if(r&&r.startsWith(`/`)){t.preventDefault(),e.navigate(r);return}}let r=t.target.closest(`.product-card`)||t.target.closest(`.related-product-card`);if(!r||t.target.closest(`button`))return;let i=r.dataset.productId;i&&(t.preventDefault(),e.navigate(`/product/${i}`))}),P=!0)},I=e=>{let t=p(),n=document.querySelector(`#limit-select`);if(!n)return;n.value=t.limit,n.onchange=t=>{let n=parseInt(t.target.value);g({limit:n}),e.loadProducts()};let r=document.querySelector(`#sort-select`);if(!r)return;r.value=t.sort,r.onchange=t=>{let n=t.target.value;g({sort:n}),e.loadProducts()};let i=document.querySelector(`#search-input`);i&&(i.value=t.search,i.addEventListener(`keypress`,t=>{if(t.key!==`Enter`)return;let n=t.target.value.trim();g({search:n}),e.loadProducts()}))},L=e=>{N&&(N.disconnect(),N=null);let t=document.querySelector(`#scroll-sentinel`);if(!t)return;let n={root:null,rootMargin:`200px`,threshold:.01};N=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&e.loadMoreProducts()})},n),N.observe(t)},R=()=>{let e=document.querySelector(`#quantity-increase`),t=document.querySelector(`#quantity-decrease`),n=document.querySelector(`#quantity-input`);e&&t&&n&&(e.onclick=()=>{let e=parseInt(n.value),t=parseInt(n.max);e<t&&(n.value=e+1)},t.onclick=()=>{let e=parseInt(n.value),t=parseInt(n.min);e>t&&(n.value=e-1)},n.addEventListener(`input`,e=>{let t=parseInt(e.target.value),n=parseInt(e.target.min),r=parseInt(e.target.max);t<n?e.target.value=n:t>r&&(e.target.value=r)}))},z=e=>{let{dispatch:t}=e;document.addEventListener(`click`,e=>{let n=e.target.closest(`.add-to-cart-btn`);if(!n)return;e.preventDefault();let r=n.dataset.productId;r&&t(o.addToCart(r))})},B=(e,t,n)=>{let r=e.getState();F(n),z(e),r.route.name===`ProductList`?(I(t),L(t)):r.route.name===`ProductDetail`&&R()},V=(e,t,n)=>{let r=()=>{let r=e.getState(),i=document.body.querySelector(`#root`);switch(r.route.name){case`ProductDetail`:i.innerHTML=j({product:r.productDetail,loading:r.productDetailLoading,relatedProducts:[],cart:r.cart});break;case`Cart`:i.innerHTML=`<div>장바구니 페이지 (준비중)</div>`;break;case`NotFound`:i.innerHTML=M(r);break;default:i.innerHTML=A({...r,cart:r.cart})}B(e,t,n)},i=()=>{e.subscribe(r),r()};return{render:r,initRenderer:i}},H=()=>r(async()=>{let{worker:e,workerOptions:t}=await import(`./browser-DvH8zzVn.js`);return{worker:e,workerOptions:t}},[]).then(({worker:e,workerOptions:t})=>e.start(t));async function U(){let e=i(c,s),t=_(e),n=x(e,{productService:t}),r=V(e,t,n);n.init(),r.initRenderer()}H().then(U);