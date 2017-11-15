$.trumbowyg.svgPath = '/vendors/css/icons.svg'

$('#job-description, #company-description, #responsibilities, #requirements' ).trumbowyg({
  autogrow : true,
  btns: [
    ['viewHTML'],
    ['undo', 'redo'], // Only supported in Blink browsers
    ['formatting'],
    ['strong', 'em', 'del'],
    ['superscript', 'subscript'],
    ['link'],
    ['insertImage'],
    ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
    ['unorderedList', 'orderedList'],
    ['horizontalRule'],
    ['removeformat'],
    ['fullscreen']
]
});

$('.trumbowyg-editor, .trumbowyg-box').css({
  'min-height' : '100px'
});