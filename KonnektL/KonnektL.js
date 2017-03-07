define([],function(){
  function CreateKonnektL()
  {
    var _onload = function(){},
        _reNodes = /(<\/.*?>)/g;

    if(!window.K_Components) window.K_Components = {};

    /* main takes name and loads file, after load it checks html and cms html if applicable */
    function KonnektL(name)
    {
      function onLoad(method)
      {
        var unknowns = KonnektL.getUnknowns(method.prototype.k_html);
        if(method.k_cms)
        {
          unknowns.concat(KonnektL.getUnknowns(method.k_cms.prototype.kcms_html));
        }
        if(unknowns.length !== 0) KonnektL(unknowns);
      }

      if(typeof name === 'object')
      {
        for(var x=0,len=name.length;x<len;x++)
        {
          if(!K_Components[name[x]])
          {
            KonnektL.load(name[x],'component/'+name[x]+'/'+location.search,_onload);
          }
          else
          {
            _onload(name[x],K_Components[name[x]],document.getElementById('script_'+name[x]));
          }
        }
      }
      else if(typeof name === 'string')
      {
        if(!K_Components[name[x]])
        {
          KonnektL.load(name,'component/'+name+'/'+location.search,_onload);
        }
        else
        {
          _onload(name,K_Components[name],document.getElementById('script_'+name));
        }
      }
    }

    /* checks for unregistered components in the html */
    KonnektL.getUnknowns = function(html)
    {
      var matched = html.match(_reNodes);
      return matched.map(function(k){
        return k.replace(/[<\/>]/g,"");
      })
      .filter(function(k,i){
        return ((document.createElement(k) instanceof HTMLUnknownElement) && (matched.indexOf(k,(i+1)) === -1) && !K_Components[k]);
      });
    }

    /* loads script tag into html */
    KonnektL.load = function(name,url,cb)
    {
      function createNode(name,src,fn)
      {
        var node = document.createElement('script');
        node.type = 'text/javascript';
        node.charset = 'utf-8';
        node.async = true;
        node.src = src;
        node.id = 'script_'+name;
        node.onload = function(){fn(name,K_Components[name],this);};
        return node;
      }

      document.head.appendChild(createNode(name,url,cb));

      return KonnektL;
    }

    KonnektL.onLoad = function(v)
    {
      if(v === undefined) return _onload;
      _onload = (typeof v === 'function' ? v : _onload);
      return KonnektL;
    }

    return KonnektL;
  }

  return CreateKonnektL;
})
