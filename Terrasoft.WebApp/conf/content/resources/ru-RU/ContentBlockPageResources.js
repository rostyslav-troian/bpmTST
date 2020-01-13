define("ContentBlockPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GeneralInfoTabCaption: "\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",
		DescriptionCaption: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",
		TagsCaption: "\u0422\u0435\u0433\u0438",
		NotesTabCaption: "\u0424\u0430\u0439\u043B\u044B \u0438 \u043F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u044F",
		ContentBlockTabCaption: "\u041D\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u0431\u043B\u043E\u043A\u0430",
		BlankSlateDescription: "\u0411\u043B\u043E\u043A \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430 \u0435\u0449\u0435 \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D.\u003Cp\u003E\u0423\u0437\u043D\u0430\u0439 \u0431\u043E\u043B\u044C\u0448\u0435 \u0432 {0}\u0410\u043A\u0430\u0434\u0435\u043C\u0438\u0438{1}",
		SetupBlockContentButtonCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C",
		DefaultPreviewData: "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUkAAAB6CAYAAAAyE6EfAAAYO0lEQVR4Ae2dS3Bb13nHfwQhELwCQfASfIgP0TBF0TCjqHKqdpzptB1nstFMJ6m9i5fuzt7Zu3jp7JJdvIuX8i6ZpDPWpk1m2s5E06YTVZYlWpZphA\u002BQIAiCIASCl5fgRefieQFeXIIkKBjkx5EG997z\u002Bs7vAH\u002Bcx3cOuvL5fB75EwJCQAgIAVsCLtun8lAICAEhIAQKBEQk5Y0gBISAEHAgICLpAEeChIAQEAIikvIeEAJCQAg4EBCRdIAjQUJACAgBEUl5DwgBISAEHAiISDrAkSAhIASEgIikvAeEgBAQAg4ERCQd4EiQEBACQkBEUt4DQkAICAEHAiKSDnAkSAgIASEgIinvASEgBISAAwERSQc4EiQEhIAQEJGU94AQEAJCwIGAiKQDHAkSAkJACIhIyntACAgBIeBAQETSAY4ECQEhIAREJOU9IASEgBBwICAi6QBHgoSAEBACIpLyHhACQkAIOBBwO4RJkBBoDQE9BV\/cg\u002BxuMb\u002Be1\u002BC7t6CnNdlLLkLgLAmISJ4lXcm7SKDbC\u002Bm7sHqvROQOBH4NM14hJAS\u002B9QRkuP2tb6JzYKApklfftFTkHizNw4HlkVwKgW8pARHJb2nDnBuzchokNBh9Ay4HqtXavAfb1Vvbq60Y7NmGyEMh8MIIiEi\u002BMNQXrCBzHvLBx\/Db1\u002BCLefBegZG3qhByv4blWPXe7urZR\/C7t\u002BH\u002BfdixiyDPhMDZExCRPHvGF6uEvRT87y\/gtwMw\/x7o88X6d5WG3N1lHA8g\u002BmfQy\/d2rxrkPoXI9\u002BFf3xKxtEMkz86cgIjkmSO\u002BIAWUxfF3A\/DVB5CzqXfwNfDfqgZs34MNrXrvdJX\/jYilEx8JOzMCIpJnhvaCZOwojqMw8CuYDkMX4BmFccuQO38XltYg34DV1Lsw9JPaQBHLWh5yd\u002BYEuvL5fKO36JkXLgV0MAFTHB99At\/Y9RrDEPwQvvMmjNW5\u002BWzdh99\/vzrMVn4FP3wHLjuw2HhQLCv28eFIXW\/CSx\/Ad193zuNwSnkiBJoiICLZFCaJVCHgKI6vw\u002BgHcOMODNWJYzmDAw3\u002B6y2Lz\u002BSbcPtucz6TqQg8\u002BhiWf1HOrfoqYlllIVctJSAi2VKc5zgzJ3HsugOT78N33gCLl09DGl9\/Av\/zL9Xg0T\/DP9yCyqJONcj26nkEvvgU\/vLh4aG6iKUtMnl4cgIikidndzFS5rXiUPfL9w4vxnT\/BK6\u002BB995HfqOgWMnAv\/\u002BGuykiok8H8EbPwX1GHmYUbUYPLoLEZshf9dP4NqH8Fq4efE9ZvES\/WIQkIWbi9HOJ6\u002BlOTyOflInkCEY\u002Bz380114\/ZgCaVqi1PlM6qbPZEkwj2OpdxRuvw8\/2gJzkcf6l\/8UVh\u002BIM7qViVyfiICI5ImwXfREEVj9Afzbz\u002BDzSHURplksZZ9Jc8W78PcAVv94\/HzMXu6ze\/CHd2DRZlGnnL28CoFTEJDh9ingXZikOzF4chcWP7AXMnPYPfEOvPoGDDRJRY\/B7\u002B\/A1oNigq534e9\/CeNNpC\/Y82tY\u002BhDMudL6v7I9c03Okdanl3shYCEgImmBIZdHEDCH3mbP7dnP4fl9m8hhUN\u002BH629BKFD0jbSJVXn0\u002BYfwxc9Kt6Pw8h\/hb0ON00Xvw5d3Yb1Br1H5KYTehlfCcgxbBbJcnJaAiORpCV7U9Mv3Yf6XkPjUnkDP\u002BzD1Nrx6CxT7KCTvwx\u002BO8Jk094B\/eQ8iP4edUq\u002BzJjvTYf1DmH27OWGuSSs3QuBoAiKSRzOSGE4EkvPFoXj0Z\/ZHn5kuOa98DH81eriHeJCC\/3gbYuVzJt\u002BEv7kL10o\u002Bll9\u002BDA\/fs8\u002BXOzD2DoTvwEgDn0wnuyVMCDRJQBZumgQl0RoQUMPwdx\/Bj7cg\/CvwhmojmtsIt9dqn5XvugNw9U75DvhN7TmT6QeHBdLzLsz8GX70GfzjmyKQFnpyeTYERCTPhuvFy7UnALfegX9\u002BArc\/A\/8bzTG48gYolp5g8h6kbZJe\/ghufgM\/\/iXcviVbEG0QyaOzISA\/33A2XC9urqZ7z8yd4n\/TT\/Gru3DJIoL1ZJQQjL4N33xSDNE\/g\u002BV3YSAArhAM3YVZc0dPEwtB9XnLvRBoAQGZk2wBRMnilASiv4H\/fKu6xXDgM\/jBHfCcMl9JLgRaQECG2y2AKFmcksDQ96E\/XM0kfQ8S1Vu5EgLtJCAi2U76UnaRQOGcScsPhR2YjuKRas9SOAmBNhKQOck2wpeiLQRefgd2X4Wc\u002BdvcvUXfSgM5nMKCSC7bQ0DmJNvDXUoVAkKgQwjIcLtDGkrMFAJCoD0ERCTbw11KFQJCoEMIiEh2SEOJmUJACLSHgIhke7hLqUJACHQIARHJDmkoMVMICIH2EBCRbA93KVUICIEOISAi2SENJWYKASHQHgIiku3hLqUKASHQIQREJDukocRMISAE2kNARLI93KVUISAEOoSAiGSHNJSYKQSEQHsIiEi2h7uUKgSEQIcQEJHskIYSM4WAEGgPARHJ9nCXUoWAEOgQAiKSHdJQYqYQEALtISAi2R7uUqoQEAIdQkBEskMaSswUAkKgPQREJNvDXUoVAkKgQwiISHZIQ4mZQkAItIeAiGR7uEupQkAIdAgBEckOaSgxUwgIgfYQEJFsD3cpVQgIgQ4hICLZIQ0lZgoBIdAeAiKS7eEupQoBIdAhBEQkO6ShxEwhIATaQ0BEsj3cpVQhIAQ6hICIZIc0lJgpBIRAewiISLaHu5QqBIRAhxAQkeyQhhIzhYAQaA8BEcn2cJdShYAQ6BACIpId0lBiphAQAu0hICLZHu5SqhAQAh1CQESyQxpKzBQCQqA9BEQk28NdShUCQqBDCLg7xM5vl5m5NCtPnxJ9nsMAXJf8jF8PM9Hn\/J1jPF9h\/qso6f1CKjz9k4Svq2QW5okktUJeJ6uoC29wmrnpAJm\/PGZhPUuukpEbZXia8Msqnsoz54vc9hLzz9bI5Ew7i3\/uy6PMhEMEKu\u002BYHMmIpSyXB3UyzOwVpZykRa8G2fgikWicVEbDYhJur4\/A8BTTU0G8zuhPbst\u002BmthKlPVkmqymoVfBFvJ0XfLg7fXh6x9kfHwMf09tUbmdOKvLa6xvZ9C04vulGMOF2\u002BPG7VEKaUeujBK8XIFbzcQsfznK2maK7K5OLl8NMst2uz0o\/gBDw\u002BOMql7OCkO11It3ZdMqFw\/C8WtssLenoe2VRCSnsXdQFD6nvIyDPbRdDf2gGMvYy5HLG\u002BT2smh7dZ8\u002Bp4zswvQcRt7A0HWye7olho6eWCc1pjLstTxueKmTWl8ntVMr2rluvUagOFSWgZYzil8aDfM\u002BZkBeJxGZ59lKCt0iDuVcclqGxNJj0pkQ4VeuErhUDmnBq6GRXFpgIZog69A0xr5Odj9JNp0kvhpl9NoNZkdN0DnSy095upggW2rvWqsMcrpe\u002BK9lUiSii\/jGw9y4Vv0y0zcjPP16haRW\/bKy5mGWrZv\/dzOk1ldYDISYm7uKXz7VVkynvpYvnlMj7IAMtDQbW1pzhmopNlLZU\/RqmyummVh6IkIkai\u002BQ1vR6cpnISsrSe7aGnuB6P8XSk4c8NgXOQSAP5ez20ucz\u002B\u002BsGmehT5iONBPJQSuhy472sVHr7hd78V0sNBfJwDi7cvQpeEcjDaE75RJCeEuDpk7vx9quoNh9xw9DJpjPo5Y5Etxe\/X8HdVV\u002BqC4\/t81K8vEZ6M0F2ZALliK9FbWuDdJN6Wm9FS\u002B\/zGslEimy57oAnMMH0tRDDPRlWF54RiWVK1HJktjbJTAYs0wEntOYgw\u002BpXT4ls1kHocheGtX5\/H73mpya\/z\u002B5Olmw2Q2ZHx8CFLzjOsM8FWpzlaALN2vt1KwRUFb9yie4u2N99TnZXI7uTQTOF2OtnKFDq6htZ4stRUtYBQZcHJaCi9vdyqQsO9nfI7miF8rPmiKbbS2DQXxHZE9ZektkQEJG0gfJCH3V5UK\u002BGUW0KNXZWefz5M5LlD4s59zkbZrhu3quSNF\u002BOWHlSudDTmyQyY1z1O6jkQYZEIl374a7k8IIvDnR2NUt9LgUYD4UYvmza72fspSm2tx8T3y3aZega2j5wqne0QWY1wmKiViA9\/WOEpkOM9tlnbmQTrMazeEcCheK17c2aLxpX7zDTc7OMFWyv45jPkdmIkTzwo\/aW6rKbYvO5pe7dCmPXbzDTYL5E344R23ah9jc761xng9w6ErBvdcckEtiRBPYzbG6mGfMXP8h2dTB2krUfTrtIL\u002ByZgWHtiZkLZHU96Pr7\u002BvjHNnU3wfJaCos84QlcJWwuWDnoj0sJMvFSuTQDY9\u002Bcay7fg7d\/iGCjLnyXG9\/wBL5qdIz9vZr5X5eiMqQ2nlD29I9ytd\u002BSgVy2lIBDt6Kl5UhmbSdQGpI2nGPLkU5skDZ7Y4U\/1yFRKoe8kFeXl94ey3f4fpYty1xpdnOdVKkXadrj6lEoTAee2DiDTCFPy\/i\u002B0HuddBTIw8UVP1LWD5ZhWFe1D6c49KTuywDDMP\/JX5sIWNuyTSZIsWdGoFvBb3ErMXuK61vWfpKlZD3NRtKyYNOjoFg0yhLzxVy6vKhqAG9FMHSSKwusbOuko\/M8jljn\/DwEBgfxncZeQyOdytT0Ir3qFYYbDLGdILh7PLgtnyxte4NkpnmVc1\/qxdNdLcHYTbGerJ0CqIbK1VkTsDTlWRcl\u002Bb94Ai58A5bJfCNLKpG0nXPUtzdI7ZY\/yC6UgQCeikC9eMvNEr1D41yxjnP1FJFHf\u002BLh1\/GaVWePOs7UmP90PoK5LM93Ld3sLi\/\u002Bfr9FpJtn4PEP4u\u002B1fLT2kiw8ecSztbTN8pxNvl4\/A37L8NpcyPn6EY\u002B\u002BiTdwJ7LJQx61jMBpvntbZkTHZ3SQITb\/J\u002BJHiUreqPhIvqg6u\/oG8fckSewVSzQXFZK7w4xZ58jMleQNy0pyt4Ia6CGbfFFWNijH7WdsapLt7ALJkv0cWIeuLrzqBDPXT\u002B8baJh\u002BrwUn\/5ItFXeeBrY5Pe5RuTISIBlJVvw7DS3F6lcPiC\/7CQRHmLRxPK9k6VIYHh1mPbVUnf44yJJcnicZWySgBrkyPnmiXm6lDLlomoCIZNOonCOajsHfyr9LAQb7vSTipeHaXprNzSyjiq\/S8zKySTa2q8M5d98QQ4qLxbZXyEDf3SVXsLTcyy0b5cY\/MUs41JrdNsbBfu1CkcuN2zpmLhfb1KurYNuM\/phn0XRFKM2kud00ieU0iZUIysAwk1MhRm28v93qFLMv68wvxMhYOrjsZ0mtLxWcxxf6VEYnQkwNK5W2bMo8iXQsAiKSx8LVgZFNF6NgACURK\/kc6qQ3N8hc8ZV2ZhhkzAWbisZ78A\u002BqKK50eytraMXdNnUiUzUqRyaxRjwY4Gq\/5W1sZFl98pBnm6UKuRRGX7nJ7JDD8nQh07rV9C4XLsuIuVpuk1ddHoLTN1F8ERaWYiTrvdLzObLJVZ5uJYgOTzIzPYG\/ZseQC2V0lptKH5HIMrFU7Q4o02Fdf55gaT5JbG206KJ0qknZJut1AaNZ3l0XsPYtq7Ibpd\u002BHt9v5U2UcaGS2rfuqW2aAY0aegRHUy3Gyz4u9sVwmycbzSfwDbsiZCzZlp2ygx8\u002BgquDKt1Ek8zrJxXmertTO4bm8Cu79bGXKwtCSRL6ch\u002Bthrpp1Mf\/2MmxnK4oPlxT6Lx8lkKZ70aXa1Xxzu6jtdkJH1HWBLpSRaW4MT5GJL7O8FieZ1mrcg8jrZNYXeLxvMBc\u002BPG3g9o8xc3OMqe1VllfWSGxl0GrsMtBTqzx7omOEw4wdcX5AnYFy2wQBEckmIB0ZpduL\u002BtIc09XTH2yT5FILPPwiS6bmTW4btbUP3T4GB3zEnpdEx5zfSqSYGghipDZI7VTHc97AEKq56JBtrQnHyS2XjrFYs8hRFJvwtVFcmwvML6ySKbsqFYTyMQezYUKqBy1d68jt8Q1gXQNpaIfbXbMizYFOrnQQScM0zQaYvpAjIcIjIYzdJKsrUdbiyZrFJ3Nr5cKynxshez9W06F92vx\/kCWxskx0PW5ZaANjN8Hi4ir\u002B8AQ\u002By8p4syZKvMYEnLs\u002BjdNJSEcRcOM3XWQqwzmD7NYGyV1z6J2qirZLKQzNq2437ahkjlR8vSqC5nbEwRBzM2P43KZYzjA3Uzc01VMsffmYhXiKRDxVXb03V6gLUwdH18Pl8eK9ZPk4HOjsWHukR2fRVAxXr8rEzA1uf2\u002BOCevKPTkym1Y\/1QbZdSsEp2a5\u002BdffY\/aKr2aDkemhsFEzgdkgD3l8LAKWd8Wx0knkDiPguqwy2GcZdpqHXmzGWU9Vu4xmnKGaD24bKnlg7kc290KX\/kzhHhlGsfSOvEPThK9P4LdUh33z\u002BLpHRCp7OMHcqXLFYadKuYjCq1vhcmFTdumpud89ZRHcmsgtuPEGCU1PolrqYOhZsg1O\/DlUojnX\u002BvIMY9ZFnwMdrX7u81BCeXBcAiKSxyXWqfG7fQSDFr\u002B\/vEZqNUqqsqht9jaH2n\/MVj7HfuHYuRLoLhduaw\u002Bv9Lhwfubs1drdMObOlHL7dHlRx8YJNNrnXo5Xfu3y4O\/31RwQoW2tsbZdnYooR23Vq8uj1PZezePnKhVoopRuD73WY3\/MedRjZdBEGRJFPAcu0nvAOzBUMz\u002BX29Wqzs0eH4Nq1S2obVy63FyyLoAZOprVydtimEcNETaF0kYIPeokodHjuMa48A2OECgdMlEoZj\/N6jcR6s67sFhwuksjZx7ia1HFbo\/tF0LDUgwd3XoKcJcLj0eWGRryOmGA9CRPCK4jk3kDDAXshcPTN4Rqd0rNi65otwdF8VS\/vc2V7miEmM22PvP0nWgsSabsaG6xVU9FWYxlqj1LS1jDy16V8dJJPuU4ueerzH\/xmMiGZctmObD8amikYqvEUjpGXiP\u002B7CEPnzxjxem0\u002BVya1b9Eq07y5gFGvX34egyyq\/M8\/HyehVWHszTzOqmVRaLWnq5Hoc\u002ByDbVsnryejoB87ZyOX4el9hAIqijxuhX2Li\u002BBIdM38jTVyZFeesR\/R53yMHfIhAjPDDts9\/PgHwigrFdtNHbiPP2\/NNE\u002BBU\/BxuJp7hlz7tJy2k5NyQdZ4t\/MA2Fmx5rtIZsO6tNMpR\u002BxYJnbNHYSLD1JsGIeoqF4q\u002Bd55nNo2eKp8oXzJMe9BPu9mCemp5IpUhurLLg9eHu8eHvcFeE3zwnVzHMkyyv0puGFNggWVqYzukZ6K01qK87KghtPjxfF66m6KJk7t3YzZAoHUZZr7UJRrxC0bocsB8nrqQiISJ4KX\u002BcldvuHUH0xMpYeiKvX7GFa9gqfsFpGTj\/0GzD1WZk\/WWEZYNYHF\u002B49g5NMjaSZX7X0BE0f0\u002BoEqk06N76ginsnUXWNMYVy4THGQZjZSX\/NSrBNBsVH3T4mrs\u002By\/9UzluoOlTD2sqT3qgtdDfOwBuR0NPP\/jvVh\/bUb32iI6cL0QB0dI1cQRN1y4lF9avPeExgr\/NZPu\/fb29nW6c9O1Xfo9MpfSPvdPoZUq\u002BuI2QMZsp3XaxufLi\/B6TCz4\/6mDtlwX1aZmL3Jrbkwc\u002BHp0sG8JetLO3eeLtc6pjvWrUclFL5BeDKIUnGbckxRDCxs0TEXmizTBUclc5suPWHmrg1XfszM\/HGvpsWu4IM5TTg8jWozN3tU8RJ\u002BNAHpSR7N6HCMLg99gSDqpdLKp1uhrzgOPBzX8sTl6SMwqOIpJzOHjw6HYrjM3SKqSvn8LldPP16LK4wl6\u002BKlOXHfFyCoe4u9NVu7XChD44xlXUVfxG6Fobp5ODOzQ2X39lc\u002BxIXC6ss6ZIz9A3e\/t7kenXnIw7VbBMcSrKyss\/U8Q9ZyAIWr24vS52dgcITRoK8yBHb1jTH7qhvP4nqNs7axYzqZ\u002B2nWIwi3wvDLcwxPZUnG1tjYSpPeqdstgwuP11v4tcSBoeqvFQ6\/cpvAlRix\u002BCbbWQ1Nq\/2Vw8Lv2fQqKP1DjI8P1x3x5kKZmON2MEVsbZ2tTLb443E1HUwXbq\u002BC4htgZGys8YG\u002B9k0gT49JoCufzzea1TlmVhJdCAgBIXD\u002BCMhw\u002B\/y1qdRICAiBFhIQkWwhTMlKCAiB80dARPL8tanUSAgIgRYSEJFsIUzJSggIgfNHQETy\/LWp1EgICIEWEhCRbCFMyUoICIHzR0BE8vy1qdRICAiBFhIQkWwhTMlKCAiB80dARPL8tanUSAgIgRYSEJFsIUzJSggIgfNHQETy\/LWp1EgICIEWEhCRbCFMyUoICIHzR0BE8vy1qdRICAiBFhIQkWwhTMlKCAiB80dARPL8tanUSAgIgRYSEJFsIUzJSggIgfNHQETy\/LWp1EgICIEWEvh\/gv9Ccvjcu18AAAAASUVORK5CYII="
	};
	var localizableImages = {
		DefaultPhoto: {
			source: 3,
			params: {
				schemaName: "ContentBlockPage",
				resourceItemName: "DefaultPhoto",
				hash: "74d0bd728776773ffe8aec1eefd77457",
				resourceItemExtension: ".svg"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "ContentBlockPage",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "ContentBlockPage",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "ContentBlockPage",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		BlankSlateImage: {
			source: 3,
			params: {
				schemaName: "ContentBlockPage",
				resourceItemName: "BlankSlateImage",
				hash: "433a50e9b11005af54405c981e2ebaf6",
				resourceItemExtension: ".svg"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "ContentBlockPage",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "ContentBlockPage",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "ContentBlockPage",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "ContentBlockPage",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "ContentBlockPage",
				resourceItemName: "OpenChangeLogBtnImage",
				hash: "cbebcb32589828e1055caf62150ff717",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});