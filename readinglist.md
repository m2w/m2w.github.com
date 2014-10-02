---
layout: base
title: A reading list
---
<article>
    {% for category in site.data.readinglist %}
        <section>
            <header>
                <h3 class="no-margin-bot margin-left">{{ category.name| capitalize }}</h3>
            </header>
            {% for book in category.books %}
                <dl>
                    <dt><em>{{ book.title }}</em> — <small>{{ book.author }}</small></dt>
                    <dd><small>{{ book.comment }}</small></dd>
                </dl>
            {% endfor %}
        </section>
    {% endfor %}
</article>
