Leveldiv
========
Leveldiv is a small library to make HTML columns have the same height.


#### Usage
```bash
$ npm install leveldiv --save
```

```js
var leveldiv = require('leveldiv');

leveldiv( {
	debounce: 300,
	responsive: 500,
	debug: true,
	row: '[data-level-row]',
	column: '[data-level-column]'
});
```

Example HTML

```html
<section data-level-row>
	<article data-level-column>
		<p>Lorem ipsum</p>
	</article>
	<article data-level-column>
		<p>Lorem ipsum</p>
	</article>
	<article data-level-column>
		<p>Lorem ipsum</p>
	</article>
</section>
```

#### Options
**Debounce:** type `Integer` default `false` required `no`<br>
Let the window resize event debounce for better performance.

**Responsive:** type `Integer` default `false` required `no`<br>
Stop calculating and setting the height at a certain width.

**Debug:** type `Boolean` default `false` required `no`<br>
Console debug

**Row:** type `char` default `false` required `no`<br>
By default leveldiv uses the data attribute "level-row" but you can also use a classname

**Column:** type `char` default `false` required `no`<br>
By default leveldiv uses the data attribute "level-column" but you can also use a classname

#### Install the example
```bash```
$ git clone git@github.com:ovdsteen/leveldiv.git
$ cd example
$ npm install
$ grunt
```
