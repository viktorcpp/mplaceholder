
export default class MPlaceholder
{
    constructor()
    {
        this.options                   = [];
        this.options.sel               = "placeholder";
        this.options.cls_fake          = "fake-ph";
        this.options.processed         = "data-processed";
        this.options.hide_on_focus     = true; /// TODO: finish
        this.options.cls_hide_on_focus = "mfocused";

    } // constructor


    Init( new_options = null )
    {
        let _options = Object.assign( this.options, this.options || new_options );
        let _all_el  = [];

        let _is_ph = document.createElement("input");
            _is_ph = "placeholder" in _is_ph;

        _all_el = Array.from( document.querySelectorAll( "["+_options.sel+"]" ) );

        _all_el.forEach((_el)=>
        {
            let _loop         = Object.create(null);
                _loop.cont    = _el.parentNode;
                _loop.fake    = document.createElement("div");
                _loop.el      = _el;
                _loop.text    = _loop.el.attributes["placeholder"].value;
                _loop.options = _options;

            _loop.fake.classList.add(_options.cls_fake);
            _loop.cont.insertBefore( _loop.fake, _loop.el );
            _loop.fake.innerText = _loop.text;

            _loop.el.attributes["placeholder"].value = "";
            _loop.fake.style["line-height"]          = _loop.cont.offsetHeight + "px";

            _loop.cont._loop = _loop;
            _loop.el  ._loop = _loop;
            _loop.fake._loop = _loop;

            _loop.el.addEventListener( "blur",  this._OnInputBlur(_el) );
            _loop.el.addEventListener( "focus", this._OnInputFocus(_el) );
        });

    } // Init



    // @private
    // _el - fake placeholder
    _OnInputFocus(_el)
    {
        return function(e)
        {
            if( _el._loop.options.hide_on_focus )
                _el._loop.fake.style["display"] = "none";
            else
                _el._loop.fake.classList.add(_el._loop.options.cls_hide_on_focus);
        }

    } // _OnFakeDown



    // @private
    // _el - input text
    _OnInputBlur(_el)
    {
        return function(e)
        {
            if( _el.value == "" )
            {
                _el._loop.fake.style["display"] = "block";
                _el._loop.fake.classList.remove(_el._loop.options.cls_hide_on_focus);
            }
        }

    } // _OnBlur

} // class MPlaceholder
