window.supportES2023 = !!(function () {
	try { return eval('Array.prototype.with') }
	catch (e) { }
})()

var loadingFailedBlueScreenPrinting = false
window.onerror = function (event, source, lineo, colno) {
	if (loadingFailedBlueScreenPrinting) return
	loadingFailedBlueScreenPrinting = true

	if (window.root && !window.loading) return
	window.stop && stop()

	var innerHTML = '<h1>:(</h1><h2>Loading failed'
	if (window.supportES2023) innerHTML += '</h2><p>Support'
	else innerHTML += ', please upgrade or change browser</h2><p>Unsupported'
	innerHTML += ' ES2023</p><style>body{background-color:#2977e7;margin:32px;color:white;font-family:Arial}h1{font-size:80px}h2{margin:48px 0;font-size:30px}</style>'

	var b
	if (b = /(MSIE |(Firefox|Chrome|Safari|Opera)\/)[\d\.]+/.exec(navigator.userAgent))
		b = b[0]
	else if (navigator.userAgent.indexOf('Trident') > -1)
		b = 'IE 11'
	else b = 'unknown'
	if (navigator.userAgent.indexOf('Mobi') > -1) b += ' Mobile'

	innerHTML += '<p>Browser: ' + b + '</p><p>UserAgent: ' + navigator.userAgent +
		'</p><p style="margin-top:48px">' +
		event.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '<br>' +
		source.replace(location.protocol + '//' + location.host, '') + ' (' + lineo + ', ' + colno + ')</p>'

	var loadingFailedBlueScreenPrinted = false
	function f() {
		if (loadingFailedBlueScreenPrinted) return
		document.body.innerHTML = innerHTML
		loadingFailedBlueScreenPrinted = true
		document.head.innerHTML = ''
	}
	setTimeout(f, 500)
	setTimeout(f, 800)
	document.readyState != 'loading' ? f() : document.addEventListener("DOMContentLoaded", f)
}
