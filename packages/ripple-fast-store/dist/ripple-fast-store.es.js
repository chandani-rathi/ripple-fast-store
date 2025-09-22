import * as $ from 'ripple/internal/client';

var root = $.template(`<div>My Ripple Lib</div>`, 0);

function MyLib(__anchor, _, __block) {
	$.push_component();

	var div_1 = root();

	$.append(__anchor, div_1);
	$.pop_component();
}

export { MyLib };
