Давно спрашивал как разукрасить цвета консолей (тех на которые вы переходите из иксов по Ctrl+Alt+F1/F2/F3/Fn tty1, tty2, tty3, ttyn) и вот месяца два назад случайно наткнулся на информацию того как это сделать, сделал и забыл. Но сегодня когда писал о zsh в самом конце вспомнил и решил осветить этот вопрос.

Оказывается все даже не просто, все очень просто! Нужно всего то вывести специальные символы `\033]P=______` только '=' замените на номер цвета в шестнадцатиричном виде, а ______ на шестнадцатиричное значение цвета RGB. Например `\033]P0050505`. Если захотите сбросить настройки то воспользуйтесь `\033]R`

Основываясь на информации из предыдущего абзаца напишем команду приводящую консоль в наш идеальный вид.

	printf "\033]P0050505\033]P1993636\033]P276943B\033]P3B2A536\033]P43F5E8C\033]P584548C\033]P6AD7F34\033]P7C9CCC4\033]P81D1D1F"

Вот такая вот коротенькая запись.