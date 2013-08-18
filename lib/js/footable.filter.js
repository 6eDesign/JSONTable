(function ($, w, undefined) {
    if (w.footable === undefined || w.footable === null)
        throw new Error('Please check and make sure footable.js is included in the page and is loaded prior to this script.');

    var jQversion = w.footable.version.parse($.fn.jquery);
    if (jQversion.major === 1 && jQversion.minor < 8) { // For older versions of jQuery, anything below 1.8
        $.expr[':'].ftcontains = function (a, i, m) {
            return $(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
        };
    } else { // For jQuery 1.8 and above
        $.expr[':'].ftcontains = $.expr.createPseudo(function (arg) {
            return function (elem) {
                var text = $(elem).find('td').text();
                var data = $(elem).find('td[data-value]').each(function () {
                    text += $(this).data('value');
                });
                return text.toUpperCase().indexOf(arg.toUpperCase()) >= 0;
            };
        });
    }

    var defaults = {
        filter: {
            enabled: true,
            input: '.footable-filter',
            timeout: 300,
            minimum: 2,
            disableEnter: false,
            filterFunction: function(index) {
                var $t = $(this),
                    $table = $t.parents('table:first'),
                    filter = $table.data('current-filter').toUpperCase(),
                    text = $t.find('td').text(),
                    data = $t.find('td[data-value]').each(function () {
                        text += $(this).data('value');
                    });
                return text.toUpperCase().indexOf(filter) >= 0;
            }
        }
    };

    function Filter() {
        var p = this;
        p.name = 'Footable Filter';
        p.init = function (ft) {
            if (ft.options.filter.enabled === true) {
                ft.timers.register('filter');
                $(ft.table).bind({
                    'footable_initialized': function (e) {
                        var $table = $(ft.table);
                        var data = {
                            'input': $table.data('filter') || ft.options.filter.input,
                            'timeout': $table.data('filter-timeout') || ft.options.filter.timeout,
                            'minimum': $table.data('filter-minimum') || ft.options.filter.minimum,
                            'disableEnter': $table.data('filter-disable-enter') || ft.options.filter.disableEnter
                        };
                        if (data.disableEnter) {
                            $(data.input).keypress(function (event) {
                                if (window.event)
                                    return (window.event.keyCode !== 13);
                                else
                                    return (event.which !== 13);
                            });
                        }
                        $table.bind('footable_clear_filter', function () {
                            $(data.input).val('');
                            p.clearFilter(ft);
                        });
                        $table.bind('footable_filter', function (event, args) {
                            p.filter(ft, args.filter);
                        });
                        $(data.input).keyup(function (eve) {
                            ft.timers.filter.stop();
                            if (eve.which === 27) {
                                $(data.input).val('');
                            }
                            ft.timers.filter.start(function () {
                                var val = $(data.input).val() || '';
                                p.filter(ft, val);
                            }, data.timeout);
                        });
                    }
                });
            }
        };

        p.filter = function (ft, filterString) {
            var $table = $(ft.table);
            var minimum = $table.data('filter-minimum') || ft.options.filter.minimum;
            var clear = !filterString;

            if (filterString && filterString.length < minimum) {
                return; //if we do not have the minimum chars then do nothing
            }

            //raise a pre-filter event so that we can cancel the filtering if needed
            var event = ft.raise('footable_filtering', { filter: filterString, clear: clear });
            if (event && event.result === false) return;

            if (clear) {
                p.clearFilter(ft);
            } else {
                var filters = filterString.split(' ');

                $table.find('> tbody > tr').hide().addClass('footable-filtered');
                var rows = $table.find('> tbody > tr:not(.footable-row-detail)');
                $.each(filters, function (i, f) {
                    if (f && f.length) {
                        $table.data('current-filter', f);
                        rows = rows.filter(ft.options.filter.filterFunction);
                    }
                });
                rows.each(function () {
                    p.showRow(this, ft);
                    $(this).removeClass('footable-filtered');
                });
                ft.raise('footable_filtered', { filter: filterString, clear: false });
            }
        };

        p.clearFilter = function (ft) {
            $(ft.table).find('> tbody > tr:not(.footable-row-detail)').removeClass('footable-filtered').each(function () {
                p.showRow(this, ft);
            });
            ft.raise('footable_filtered', { clear: true });
        };

        p.showRow = function (row, ft) {
            var $row = $(row), $next = $row.next(), $table = $(ft.table);
            if ($row.is(':visible')) return; //already visible - do nothing
            if ($table.hasClass('breakpoint') && $row.hasClass('footable-detail-show') && $next.hasClass('footable-row-detail')) {
                $row.add($next).show();
                ft.createOrUpdateDetailRow(row);
            }
            else $row.show();
        };
    }

    w.footable.plugins.register(new Filter(), defaults);

})(jQuery, window);
