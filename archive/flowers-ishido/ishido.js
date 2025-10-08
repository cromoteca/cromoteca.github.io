loadIshido = function(container) {
	var vibrate = true
	var pt = 'point.png'

	var $container = $(container).css('background-color', 'black').append(
			'<div id=f_checker></div>')

	var relayout = function() {
		var w = $container.width() || $(window).width()
		var h = $container.height() || $(window).height()
		var portrait = h > w
		var max = portrait ? h : w
		var min = portrait ? w : h
		var ts = Math.floor(Math.min(min / 8, max / 13))
		var t8 = ts * 8
		var t13 = ts * 13
		var b8 = (min - t8) / 2 + 'px'
		var b13 = (max - t13) / 2 + 'px'

		if (portrait) {
			$container.removeClass('f_landscape').addClass('f_portrait')
			$('#f_checker').css('top', b13).css('right', b8).css('bottom', b13)
					.css('left', b8)
		} else {
			$container.removeClass('f_portrait').addClass('f_landscape')
			$('#f_checker').css('top', b8).css('right', b13).css('bottom', b8)
					.css('left', b13)
		}
	}

	relayout()

	for ( var r = 0; r < 12; r++) {
		$('#f_checker').append('<div id=f_row' + r + ' class=f_row></div>')

		for ( var c = 0; c < 8; c++) {
			$('#f_row' + r).append(
					'<img id=f_tile_' + r + '_' + c + ' class=f_tile src=' + pt
							+ '>')
		}
	}

	$('#f_checker').append(
			'<div id=f_bar class=f_row>'
					+ '<div class=f_label><span>\u25ba</span></div>'
					+ '<div><img id=f_next src=' + pt + '></div>'
					+ '<div class=f_label><span>\u25b2</span></div>'
					+ '<div id=f_score>0</div>'
					+ '<div class=f_label><span>\u25bc</span></div>'
					+ '<div id=f_remaining>66</div>' + '</div>')

	var shapes = [ 'clubs.png', 'diamonds.png', 'hearts.png', 'spades.png',
			'square.png', 'star.png' ]
	var colors = [ 'f_red', 'f_green', 'f_blue', 'f_yellow', 'f_fuchsia',
			'f_orange' ]
	var tiles = []

	var getRandomInt = function(max) {
		return Math.floor(Math.random() * max)
	}

	var get$tile = function(r, c) {
		return $('#f_tile_' + r + '_' + c)
	}

	for ( var i = 0; i < 2; i++) {
		for ( var j = 0; j < 6; j++) {
			for ( var k = 0; k < 6; k++) {
				tiles.splice(getRandomInt(tiles.length), 0, {
					shape : shapes[j],
					color : colors[k]
				})
			}
		}
	}

	var sh = shapes.slice(0)
	var co = colors.slice(0)
	var done = 0
	var last = tiles.length

	while (done < 6) {
		var curr = tiles[done]
		var ish = sh.indexOf(curr.shape)
		var ico = co.indexOf(curr.color)

		if (ish < 0 || ico < 0) {
			tiles[done] = tiles[--last]
			tiles[last] = curr
		} else {
			done++
			sh.splice(ish, 1)
			co.splice(ico, 1)
		}
	}

	var rinit = [ 0, 0, 5, 6, 11, 11 ]
	var cinit = [ 0, 7, 3, 4, 0, 7 ]

	for ( var i = 0; i < 6; i++) {
		var r = rinit[i]
		var c = cinit[i]
		get$tile(r, c).attr('src', tiles[i].shape).addClass(tiles[i].color)
	}

	tiles.splice(0, 6)
	var sides = [ [ -1, 0 ], [ 0, 1 ], [ 1, 0 ], [ 0, -1 ] ]
	var bonus4 = [ 25, 50, 100, 200, 400, 600, 800, 1000, 5000, 10000, 50000 ]
	var lastBonus = 0

	var checkNeighbor = function(check, r, c, shape, color) {
		var $tile = get$tile(r, c)

		if ($tile.length && $tile.attr('src') !== pt) {
			check.nearby++
			var sameColor = $tile.hasClass(color)

			if ($tile.attr('src') === shape) {
				check.shapes++
				check.matches++

				if (sameColor) {
					check.colors++
				}
			} else if (sameColor) {
				check.colors++
				check.matches++
			}
		}
	}

	var getScore = function(r, c, shape, color) {
		var check = {
			nearby : 0,
			matches : 0,
			colors : 0,
			shapes : 0
		}

		var score = 0

		if (get$tile(r, c).attr('src') === pt) {
			for ( var i = 0; i < sides.length; i++) {
				checkNeighbor(check, r + sides[i][0], c + sides[i][1], shape,
						color)
			}

			if (check.nearby === check.matches) {
				switch (check.matches) {
				case 1:
					score = 1
					break
				case 2:
					if (check.colors && check.shapes) {
						score = 2
					}

					break
				case 3:
					if (check.colors && check.shapes) {
						score = 4
					}

					break
				case 4:
					if (check.colors > 1 && check.shapes > 1) {
						score = 8 + bonus4[lastBonus]

						if (lastBonus < bonus4.length - 1) {
							lastBonus++
						}
					}

					break
				}
			}
		}

		return score
	}

	var goodTiles = function() {
		var shape = tiles[0].shape
		var color = tiles[0].color
		var places = []

		for ( var r = 0; r < 12; r++) {
			for ( var c = 0; c < 8; c++) {
				if (getScore(r, c, shape, color)) {
					places.push({
						r : r,
						c : c
					})
				}
			}
		}

		return places
	}

	var addScore = function(score) {
		var $score = $('#f_score')
		$score.text(score + parseInt($score.text()))
		$('#f_remaining').text(tiles.length - 1)
	}

	var end = function() {
		switch (tiles.length) {
		case 0:
			addScore(999)
			break
		case 1:
			addScore(666)
			break
		case 2:
			addScore(333)
			break
		}

		tiles = []
		$('#f_next').fadeOut()

		var score = parseInt($('#f_score').text())
		var top5

		try {
			top5 = JSON.parse(window.localStorage.getItem('top5'))
		} catch (e) {
		}

		top5 = top5 || []
		var pos = -1

		for ( var i = 0; i < top5.length; i++) {
			if (top5[i].score < score) {
				pos = i
				break
			}
		}

		if (pos === -1 && top5.length < 5) {
			pos = top5.length
		}

		if (pos !== -1) {
			top5.splice(pos, 0, {
				name : '?',
				score : score
			})
			top5 = top5.slice(0, 5)
		}

		$('#f_checker')
				.append(
						'<div id=f_shield></div><div id=f_chart style="display:none"></div>')
		var $chart = $('#f_chart')
				.append(
						'<div class=f_close><span>\u00d7</span></div><div class=f_title>Top 5</div>')

		$('div.f_close span').click(function() {
			location.reload()
		})

		for ( var i = 0; i < top5.length; i++) {
			var $last = $chart.append('<div class=f_score>').children().last()

			if (i === pos) {
				var eh = function(fld) {
					var $input = $(fld)
					var val = $.trim($input.val())

					if (val.length > 0) {
						top5[pos].name = val
						window.localStorage.setItem('top5', JSON
								.stringify(top5))
						$input.replaceWith(top5[pos].name)
					}
				}
				$last.append('<span class=f_name><input maxlength=15></span>')
						.find('input').keypress(function(e) {
							if (e.keyCode == '13') {
								eh(this)
							}
						}).blur(function() {
							eh(this)
						})
			} else {
				$last.append('<span class=f_name>' + top5[i].name + '</span>')
			}

			$last.append('<span class=f_score>' + top5[i].score + '</span>')
		}

		$chart.show().find('input').focus()
	}

	var showNext = function(oldColor) {
		if (tiles.length) {
			var $next = $('#f_next')

			if (oldColor) {
				$next.removeClass(oldColor)
			}

			$next.attr('src', tiles[0].shape).addClass(tiles[0].color)

			if (!goodTiles().length) {
				end()
			}
		} else {
			end()
		}
	}

	$('img.f_tile').click(
			function() {
				if (tiles.length) {
					var $tile = $(this)
					var next = tiles[0]
					var id = this.id.substring(7).split('_')
					var r = parseInt(id[0])
					var c = parseInt(id[1])
					var score = getScore(r, c, next.shape, next.color)

					if (score) {
						addScore(score)
						vibrate && navigator.notification
								&& navigator.notification.vibrate
								&& navigator.notification.vibrate(50)
						$tile.attr('src', next.shape).addClass(next.color)
						tiles.splice(0, 1)
						showNext(next.color)
					}
				}
			})

	var simulate = function() {
		var places = goodTiles()

		if (places.length) {
			var place = places[getRandomInt(places.length)]
			get$tile(place.r, place.c).click()

			if (tiles.length) {
				setTimeout(function() {
					simulate()
				}, 10)
			}
		}
	}

	$('#f_next').click(function(e) {
		vibrate = false
		simulate()
	})

	showNext()

	$(window).resize(relayout)
}
