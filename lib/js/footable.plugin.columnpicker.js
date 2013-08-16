(function ($, w, undefined) {
    if (w.footable == undefined || w.footable == null)
        throw new Error('Please check and make sure footable.js is included in the page and is loaded prior to this script.');

    var defaults = {
      enabled: true
    };

    function MyPlugin() {
      var p = this;
      p.name = 'Footable Column-Picker Plugin';
      
      p.init = function(ft) {
        var menu, curtain, lastClicked; 

        var hideMenu = function() { 
          curtain.style.display = "none"; 
        }

        var showMenu = function(coords) { 
          menu.style.top = coords.y + "px"; 
          menu.style.left = coords.x + "px"; 
          curtain.style.display = "block"; 
        }

        var showColumn = function(elem) { 
          var colsIndex = elem.getAttribute('data-colsIndex'); 

          ft.columns[colsIndex].hide.desktop = false; 

          var th = ft.table.getElementsByTagName('thead')[0].getElementsByTagName('th')[colsIndex]; 
          th.setAttribute('data-hide','phone,tablet'); 

          ft.resize(true); 

          $(elem).addClass('disabled'); 
        }

        var hideColumn = function() { 
          var colsIndex; 
          // find the item inside of the ft.columns and hide it for desktop breakpoints
          for(var key in ft.columns) { 
            if(ft.columns[key].name == lastClicked.name) { 
              ft.columns[key].hide.desktop = true; 
              colsIndex = key; 
            }  
          }
          // change the data-hide attribute of the <th> item
          lastClicked.elem.setAttribute('data-hide','phone,tablet,desktop'); 
          // reactivate this item within the custom contextMenu
          $(menu.getElementsByTagName('p')[colsIndex]).removeClass('disabled'); 
          // invoke ft.resize() to cement our changes in the footable
          ft.resize(true); 
        }

        var createContextMenu = function() { 
          var cols = ft.columns; 

          curtain = window.create({ 
            type: 'div', 
            attributes: { 
              'class': 'curtain'
            }
          })

          curtain.style.height="2500px";

          $(curtain).on('click',function() { 
            hideMenu(); 
          }); 

          menu = window.create({
            type: 'div', 
            attributes: { 
              'class': 'columnPicker disabled'
            }, 
            contains: []
          }); 

          for(var key in cols) { 
            var className = "columnPickerItem"
            className += (cols[key].hide.desktop) ? "" : " disabled"; 
            var item = window.create({
              type: 'p', 
              attributes: { 
                'class': className, 
                'data-colsIndex': cols[key].index
              }, 
              contains: [cols[key].name]
            }); 
            menu.appendChild(item); 
            $(item).on('click',function(){
              showColumn(this);               
            });
          }

          var item = window.create({
            type: 'p', 
            attributes: { 
              'class': "columnPickerItem removeColumn"
            }, 
            contains: [ 'Hide Column' ] 
          }); 

          menu.appendChild(item);

          $(item).on('click',function() { 
            hideColumn(); 
          }); 

          curtain.appendChild(menu); 
          document.body.appendChild(curtain); 
        }

        // dispatch right click events on thead to open column picker menu: 
        $(document).on('contextmenu', function(e){ 
          if($(e.target).is('table.footable > thead > tr > th')) { 
            lastClicked = { elem: e.target, name: $(e.target).text() }; 
            showMenu({x: e.pageX, y: e.pageY}); 
            return false; 
          }
        }); 

        // INIT: 
        $(ft.table).bind({
          'footable_initialized': function(e){
            // create the column picker menu
            createContextMenu(); 
          }
        });
      };
    };
    
    w.footable.plugins.register(new MyPlugin(), defaults);

})(jQuery, window);