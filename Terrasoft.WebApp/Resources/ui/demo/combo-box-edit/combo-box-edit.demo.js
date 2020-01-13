define(["ext-base", "terrasoft"], function(Ext) {
	return {
		"render": function(renderTo) {
			Ext.onReady(function() {
				var settlements = [
					"Авдеевка — Донецкая область",
					"Александрия — Кировоградская область",
					"Александровск — Луганская область",
					"Алмазная — Луганская область",
					"Алупка — Автономная Республика Крым",
					"Алушта — Автономная Республика Крым",
					"Алчевск — Луганская область",
					"Ананьев — Одесская область",
					"Андрушёвка — Житомирская область",
					"Антрацит — Луганская область",
					"Апостолово — Днепропетровская область",
					"Армянск — Автономная Республика Крым",
					"Артёмовск — Донецкая область",
					"Артёмовск — Луганская область",
					"Арциз — Одесская область",
					"Ахтырка — Сумская область",
					"Балаклея — Харьковская область",
					"Балта — Одесская область",
					"Бар — Винницкая область",
					"Барановка — Житомирская область",
					"Барвенково — Харьковская область",
					"Бахмач — Черниговская область",
					"Бахчисарай — Автономная Республика Крым",
					"Баштанка — Николаевская область",
					"Белая Церковь — Киевская область",
					"Белгород-Днестровский — Одесская область",
					"Белогорск — Автономная Республика Крым",
					"Беляевка - Одесская область",
					"Белополье — Сумская область",
					"Белз — Львовская область",
					"Бердичев — Житомирская область",
					"Бердянск — Запорожская область",
					"Берегово — Закарпатская область",
					"Бережаны — Тернопольская область",
					"Березань — Киевская область",
					"Березне — Ровненская область",
					"Берестечко — Волынская область",
					"Берислав— Херсонская область",
					"Бершадь — Винницкая область",
					"Бобринец — Кировоградская область",
					"Бобрка — Львовская область",
					"Бобровица — Черниговская область",
					"Богодухов — Харьковская область",
					"Богуслав — Киевская область",
					"Болград — Одесская область",
					"Болехов — Ивано-Франковская область",
					"Борислав — Львовская область",
					"Борисполь — Киевская область",
					"Борзна — Черниговская область",
					"Борщёв — Тернопольская область",
					"Боярка — Киевская область",
					"Бровары — Киевская область",
					"Броды — Львовская область",
					"Брянка — Луганская область",
					"Бурынь — Сумская область",
					"Бурштын — Ивано-Франковская область",
					"Буск — Львовская область",
					"Буча — Киевская область",
					"Бучач — Тернопольская область",
					"Валки — Харьковская область",
					"Васильевка — Запорожская область",
					"Васильков — Киевская область",
					"Вашковцы — Черновицкая область",
					"Ватутино — Черкасская область",
					"Вахрушево — Луганская область",
					"Великий Бурлук — Харьковская область",
					"Великие Мосты — Львовская область",
					"Верхнеднепровск — Днепропетровская область",
					"Вольнянск — Запорожская область",
					"Винница — Винницкая область",
					"Виноградов — Закарпатская область",
					"Вишнёвое — Киевская область",
					"Владимир-Волынский — Волынская область",
					"Вознесенск — Николаевская область",
					"Волноваха — Донецкая область",
					"Волчанск — Харьковская область",
					"Волочиск — Хмельницкая область",
					"Вольногорск — Днепропетровская область",
					"Вижница — Черновицкая область",
					"Вышгород — Киевская область",
					"Гадяч — Полтавская область",
					"Гайсин — Винницкая область",
					"Гайворон — Кировоградская область",
					"Галич — Ивано-Франковская область",
					"Геническ — Херсонская область",
					"Герца — Черновицкая область",
					"Глобино — Полтавская область",
					"Глухов — Сумская область",
					"Глиняны — Львовская область",
					"Голая Пристань — Херсонская область",
					"Горловка — Донецкая область",
					"Горное — Луганская область",
					"Городенка — Ивано-Франковская область",
					"Городище — Черкасская область",
					"Городня — Черниговская область",
					"Городок — Львовская область",
					"Городок — Хмельницкая область",
					"Горохов — Волынская область",
					"Гребёнка — Полтавская область",
					"Гуляйполе — Запорожская область",
					"Джанкой — Автономная Республика Крым",
					"Дзержинск — Донецкая область",
					"Дебальцево — Донецкая область",
					"Деражня — Хмельницкая область",
					"Дергачи — Харьковская область",
					"Десна — Черниговская область",
					"Димитров — Донецкая область",
					"Днепродзержинск — Днепропетровская область",
					"Днепропетровск — Днепропетровская область",
					"Днепрорудное — Запорожская область",
					"Добромиль — Львовская область",
					"Доброполье — Донецкая область",
					"Докучаевск — Донецкая область",
					"Долина — Ивано-Франковская область",
					"Долинская — Кировоградская область",
					"Донецк — Донецкая область",
					"Дрогобыч — Львовская область",
					"Дружковка — Донецкая область",
					"Дубно — Ровненская область",
					"Дубляны — Львовская область",
					"Дубровица — Ровненская область",
					"Дунаевцы — Хмельницкая область",
					"Евпатория — Автономная Республика Крым",
					"Енакиево — Донецкая область",
					"Жашков — Черкасская область",
					"Ждановка — Донецкая область",
					"Жёлтые Воды — Днепропетровская область",
					"Жидачов — Львовская область",
					"Житомир — Житомирская область",
					"Жмеринка — Винницкая область",
					"Жолква — Львовская область",
					"Залещики — Тернопольская область",
					"Запорожье — Запорожская область",
					"Заставна — Черновицкая область",
					"Збараж — Тернопольская область",
					"Зборов — Тернопольская область",
					"Звенигородка — Черкасская область",
					"Здолбунов — Ровненская область",
					"Зимогорье — Луганская область",
					"Зеньков — Полтавская область",
					"Змиёв — Харьковская область",
					"Знаменка — Кировоградская область",
					"Золотое — Луганская область",
					"Золотоноша — Черкасская область",
					"Золочев — Львовская область",
					"Зоринск — Луганская область",
					"Зугрэс — Донецкая область",
					"Ивано-Франковск — Ивано-Франковская область",
					"Измаил — Одесская область",
					"Изюм — Харьковская область",
					"Изяслав — Хмельницкая область",
					"Ильичёвск — Одесская область",
					"Ирпень — Киевская область",
					"Иршава — Закарпатская область",
					"Ичня — Черниговская область",
					"Кагарлык — Киевская область",
					"Казатин — Винницкая область",
					"Калиновка — Винницкая область",
					"Калуш — Ивано-Франковская область",
					"Каменец-Подольский — Хмельницкая область",
					"Каменка — Черкасская область",
					"Каменка-Бугская — Львовская область",
					"Каменка-Днепровская — Запорожская область",
					"Камень-Каширский — Волынская область",
					"Канев — Черкасская область",
					"Карловка — Полтавская область",
					"Каховка — Херсонская область",
					"Керчь — Автономная Республика Крым",
					"Киверцы — Волынская область",
					"Киев",
					"Килия — Одесская область",
					"Кировоград — Кировоградская область",
					"Кировское — Донецкая область",
					"Кицмань — Черновицкая область",
					"Краматорск — Донецкая область",
					"Красилов — Хмельницкая область",
					"Красноармейск — Донецкая область",
					"Красноград — Харьковская область",
					"Краснодон — Луганская область",
					"Краснопартизанск — Луганская область",
					"Красноперекопск — Автономная Республика Крым",
					"Красный Лиман — Донецкая область",
					"Красный Луч — Луганская область",
					"Кременец — Тернопольская область",
					"Кременчуг — Полтавская область",
					"Кривой Рог — Днепропетровская область",
					"Кролевец — Сумская область",
					"Кобеляки — Полтавская область",
					"Ковель — Волынская область",
					"Кодыма — Одесская область",
					"Коломыя — Ивано-Франковская область",
					"Комсомольск — Полтавская область",
					"Конотоп — Сумская область",
					"Константиновка — Донецкая область",
					"Корец — Ровненская область",
					"Коростень — Житомирская область",
					"Коростышев — Житомирская область",
					"Корсунь-Шевченковский — Черкасская область",
					"Корюковка — Черниговская область",
					"Косов — Ивано-Франковская область",
					"Костополь — Ровненская область",
					"Котовск — Одесская область",
					"Кузнецовск — Ровненская область",
					"Купянск — Харьковская область",
					"Ладыжин — Винницкая область",
					"Лановцы — Тернопольская область",
					"Лебедин — Сумская область",
					"Лисичанск — Луганская область",
					"Лозовая — Харьковская область",
					"Лохвица — Полтавская область",
					"Лубны — Полтавская область",
					"Луганск — Луганская область",
					"Лутугино — Луганская область",
					"Луцк — Волынская область",
					"Львов — Львовская область",
					"Любомль — Волынская область",
					"Люботин — Харьковская область",
					"Малин — Житомирская область",
					"Марганец — Днепропетровская область",
					"Мариуполь — Донецкая область",
					"Макеевка — Донецкая область",
					"Малая Виска — Кировоградская область",
					"Мелитополь — Запорожская область",
					"Мена — Черниговская область",
					"Мерефа — Харьковская область",
					"Миргород — Полтавская область",
					"Мироновка — Киевская область",
					"Миусинск — Луганская область",
					"Могилёв-Подольский — Винницкая область",
					"Молодогвардейск — Луганская область",
					"Молочанск — Запорожская область",
					"Монастыриска — Тернопольская область",
					"Монастырище — Черкасская область",
					"Мостиска — Львовская область",
					"Мукачево — Закарпатская область",
					"Надворная — Ивано-Франковская область",
					"Николаев — Львовская область",
					"Николаев — Николаевская область",
					"Никополь — Днепропетровская область",
					"Нежин — Черниговская область",
					"Немиров — Винницкая область",
					"Нетешин — Хмельницкая область",
					"Новая Каховка — Херсонская область",
					"Новая Одесса — Николаевская область",
					"Новый Буг — Николаевская область",
					"Нововолынск — Волынская область",
					"Новгород-Северский — Черниговская область",
					"Новогродовка— Донецкая область",
					"Новомиргород — Кировоградская область",
					"Новоград-Волынский — Житомирская область",
					"Новодружеск — Луганская область",
					"Новоднестровск — Черновицкая область",
					"Новомосковск — Днепропетровская область",
					"Новопсков — Луганская область",
					"Новоселица — Черновицкая область",
					"Новоукраинка — Кировоградская область",
					"Новый Роздол — Львовская область",
					"Носовка — Черниговская область",
					"Майорск— Донецкая область",
					"Обухов — Киевская область",
					"Овруч — Житомирская область",
					"Одесса — Одесская область",
					"Орджоникидзе — Днепропетровская область",
					"Орехов — Запорожская область",
					"Острог — Ровненская область",
					"Очаков — Николаевская область",
					"Павлоград — Днепропетровская область",
					"Первомайск — Луганская область",
					"Первомайск — Николаевская область",
					"Первомайский — Харьковская область",
					"Перевальск — Луганская область",
					"Перемышляны — Львовская область",
					"Перечин — Закарпатская область",
					"Перещепино — Днепропетровская область",
					"Переяслав-Хмельницкий — Киевская область",
					"Першотравенск — Днепропетровская область",
					"Петровское — Луганская область",
					"Пирятин — Полтавская область",
					"Погребище — Винницкая область",
					"Подволочиск — Тернопольская область",
					"Подгайцы — Тернопольская область",
					"Подгородное — Днепропетровская область",
					"Пологи — Запорожская область",
					"Полонное — Хмельницкая область",
					"Полтава — Полтавская область",
					"Попасная — Луганская область",
					"Почаев — Тернопольская область",
					"Приволье — Луганская область",
					"Прилуки — Черниговская область",
					"Приморск — Запорожская область",
					"Припять — Киевская область",
					"Пустомыты — Львовская область",
					"Путивль — Сумская область",
					"Пятихатки — Днепропетровская область",
					"Рава-Русская — Львовская область",
					"Радехов — Львовская область",
					"Радомышль — Житомирская область",
					"Радивилов — Ровненская область",
					"Рахов — Закарпатская область",
					"Ржищев — Киевская область",
					"Рогатин — Ивано-Франковская область",
					"Ровеньки — Луганская область",
					"Ровно — Ровненская область",
					"Рожище — Волынская область",
					"Ромны — Сумская область",
					"Рубежное — Луганская область",
					"Рудки — Львовская область",
					"Саки — Автономная Республика Крым",
					"Самбор — Львовская область",
					"Сарны — Ровненская область",
					"Свалява — Закарпатская область",
					"Сватово — Луганская область",
					"Свердловск — Луганская область",
					"Светловодск — Кировоградская область",
					"Севастополь",
					"Северодонецк — Луганская область",
					"Седнев — Черниговская область",
					"Селидово — Донецкая область",
					"Семёновка — Черниговская область",
					"Середина-Буда — Сумская область",
					"Симферополь — Автономная Республика Крым",
					"Синельниково — Днепропетровская область",
					"Скадовск — Херсонская область",
					"Скалат — Тернопольская область",
					"Сквира — Киевская область",
					"Сколе — Львовская область",
					"Славута — Хмельницкая область",
					"Славутич — Киевская область",
					"Славянск — Донецкая область",
					"Смела — Черкасская область",
					"Снежное — Донецкая область",
					"Снигирёвка — Николаевская область",
					"Снятын — Ивано-Франковская область",
					"Сокаль — Львовская область",
					"Сокиряны — Черновицкая область",
					"Соледар — Донецкая область",
					"Старобельск — Луганская область",
					"Староконстантинов — Хмельницкая область",
					"Старый Крым — Автономная Республика Крым",
					"Старый Самбор — Львовская область",
					"Стаханов — Луганская область",
					"Сторожинец — Черновицкая область",
					"Стрый — Львовская область",
					"Судак — Автономная Республика Крым",
					"Сумы — Сумская область",
					"Суходольск — Луганская область",
					"Счастье — Луганская область",
					"Таврийск — Херсонская область",
					"Тальное — Черкасская область",
					"Тараща — Киевская область",
					"Татарбунары — Одесская область",
					"Теплогорск — Луганская область",
					"Теплодар — Одесская область",
					"Тернополь — Тернопольская область",
					"Терновка — Днепропетровская область",
					"Тетиев — Киевская область",
					"Тысменица — Ивано-Франковская область",
					"Тлумач — Ивано-Франковская область",
					"Теребовля — Тернопольская область",
					"Тростянец — Сумская область",
					"Трускавец — Львовская область",
					"Токмак — Запорожская область",
					"Торез — Донецкая область",
					"Тульчин — Винницкая область",
					"Тячев — Закарпатская область",
					"Угледар — Донецкая область",
					"Угнев — Львовская область",
					"Узин — Киевская область",
					"Украинка — Киевская область",
					"Ужгород — Закарпатская область",
					"Умань — Черкасская область",
					"Устилуг — Волынская область",
					"Фастов — Киевская область",
					"Феодосия — Автономная Республика Крым",
					"Харцызск — Донецкая область",
					"Харьков — Харьковская область,",
					"Херсон — Херсонская область",
					"Хмельник — Винницкая область",
					"Хмельницкий — Хмельницкая область",
					"Хорол — Полтавская область",
					"Хотин — Черновицкая область",
					"Христиновка — Черкасская область",
					"Хуст — Закарпатская область",
					"Хыров — Львовская область",
					"Цюрупинск — Херсонская область",
					"Червоноград — Львовская область",
					"Червонозаводское — Полтавская область",
					"Червонопартизанск— Луганская область",
					"Черкассы — Черкасская область",
					"Чернигов — Черниговская область",
					"Чернобыль — Киевская область",
					"Черновцы — Черновицкая область",
					"Чигирин — Черкасская область",
					"Чоп — Закарпатская область",
					"Чортков — Тернопольская область",
					"Чугуев — Харьковская область",
					"Шаргород — Винницкая область",
					"Шахтёрск — Донецкая область",
					"Шепетовка — Хмельницкая область",
					"Шостка — Сумская область",
					"Шпола — Черкасская область",
					"Шумск — Тернопольская область",
					"Щёлкино — Автономная Республика Крым",
					"Щорс — Черниговская область",
					"Энергодар — Запорожская область",
					"Южное — Одесская область",
					"Южноукраинск — Николаевская область",
					"Яворов — Львовская область",
					"Яготин — Киевская область",
					"Ялта — Автономная Республика Крым",
					"Ямполь — Винницкая область",
					"Яремче — Ивано-Франковская область",
					"Ясиноватая — Донецкая область"
				];

				var collection = Ext.create("Terrasoft.Collection");
				var collectionCL = Ext.create("Terrasoft.Collection");
				for (var i = 2, c = settlements.length + 1; i < c; i += 1) {
					collection.add("key" + i * 2,
						{
							name: settlements[i],
							id: String(i * 3),
							someProperty: String(i * 13)
						});
					collectionCL.add("key" + i * 2,
						{
							name: settlements[i],
							id: String(i * 3),
							someProperty: String(i * 13)
						});
				}

				var comboBox = window.combobox = Ext.create("Terrasoft.ComboBoxEdit", {
					renderTo: renderTo,
					width: "300px",
					minSearchCharsCount: 0,
					markerValue: "testMarker",
					rightIconClasses: ["combobox-edit-right-icon"],
					//rightIconUrl: "data:image/gif;base64,R0lGODlhEAAQAPAAAP///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/h1" +
					// "HaWZCdWlsZGVyIDAuNSBieSBZdmVzIFBpZ3VldAAh+QQJDwAAACwAAAAAEAAQAAACIISPqcsWH5pDT6poD9ZywwWF31V" +
					// "NzWZmAJqVKROqslUAACH5BAkPAAAALAAAAAAQABAAAAIhhI+pyxkc4jtxVTXRdbxl8GFaA45e54QlpoKf1K7kTCsFAC" +
					// "H5BAkPAAAALAAAAAAQABAAAAIjhA+By6Hc3INJOWrmpBv1vmygR2IiloQcmmbodZkSm40rUwAAIfkECQ8AAAAsAAAAA" +
					// "BAAEAAAAiCEj6nLFh/cegiqmGxm+PQGhuL4AaV3UVumOqfptuPMFAA7",
					listViewConfig: {
						map: {
							value: "id",
							displayValue: "name",
							customHTML: "customHtml"
						}
					}
				});
				var comboBox2 = window.combobox = Ext.create("Terrasoft.ComboBoxEdit", {
					renderTo: renderTo,
					width: "100px",
					minSearchCharsCount: 0,
					markerValue: "testMarker2",
					rightIconClasses: ["combobox-edit-right-icon"],
					//rightIconUrl: "data:image/gif;base64,R0lGODlhEAAQAPAAAP///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh/" +
					// "h1HaWZCdWlsZGVyIDAuNSBieSBZdmVzIFBpZ3VldAAh+QQJDwAAACwAAAAAEAAQAAACIISPqcsWH5pDT6poD9ZywwW" +
					// "F31VNzWZmAJqVKROqslUAACH5BAkPAAAALAAAAAAQABAAAAIhhI+pyxkc4jtxVTXRdbxl8GFaA45e54QlpoKf1K7kT" +
					// "CsFACH5BAkPAAAALAAAAAAQABAAAAIjhA+By6Hc3INJOWrmpBv1vmygR2IiloQcmmbodZkSm40rUwAAIfkECQ8AAAAs" +
					// "AAAAABAAEAAAAiCEj6nLFh/cegiqmGxm+PQGhuL4AaV3UVumOqfptuPMFAA7",
					listViewConfig: {
						map: {
							value: "id",
							displayValue: "name",
							customHTML: "customHtml"
						}
					}
				});
				var handler = (function() {
					var timerId = null;
					var launch = 0;
					return function() {
						launch += 1;
						if (launch === 1) {
							timerId = Ext.defer(function() {
								comboBox.loadList(collection);
							}, 1000, this);
							return false;
						}
						if (comboBox.list === null) {
							return;
						} else {
							comboBox.loadList(collection);
						}
					};
				}());
				var handler1 = (function() {
					var timerId = null;
					var launch = 0;
					return function() {
						launch += 1;
						if (launch === 1) {
							timerId = Ext.defer(function() {
								comboBox2.loadList(collection);
							}, 1000, this);
							return false;
						}
						if (comboBox2.list === null) {
							return;
						} else {
							comboBox2.loadList(collection);
						}
					};
				}());
				comboBox.on("prepareList", handler);
				comboBox2.on("prepareList", handler1);
			});
		}
	};
});