<article id="idx{{id}}" class="article">
  <figure class="image">
    <a href="{{itemUrl}}"><span><img src="{{largeImageUrl}}" alt=""></span></a>
  </figure>
  <div class="detail">
    <div>
      <h1 class="title">
        <a href="{{itemUrl}}">{{title}}</a>
      </h1>
    </div>
    <div>
      <div>¥{{itemPrice}}
        {{#if discountRate}}
          <small>({{discountRate}}%off)</small>
        {{/if}}
      </div>
    </div>
    <div>
      <div><div>{{author}}</div><div>{{artistName}}</div><div>{{publisherName}}</div><div>{{label}}</div><div>{{hardware}}</div><div>{{os}}</div></div>
    </div>
  </div>
  <span class="status" title="Favorite"></span>
</article>