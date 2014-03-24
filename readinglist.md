---
layout: base
title: A reading list
---
<h2>{{ page.title }}</h2>
<article>
    {% for category in site.data.readinglist %}
        <section>
            <header>
                <span class="cell indented">&#x27A4;</span>
                <h3 class="cell"><em>{{ category.name | capitalize }}</em></h3>
            </header>
            {% for book in category.books %}
                <dl>
                    <dt><strong>{{ book.title }}</strong> — {{ book.author }}</dt>
                    <dd><small>{{ book.comment }}</small></dd>
                </dl>
            {% endfor %}
        </section>
    {% endfor %}
</article>
