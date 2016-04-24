!(right)http://ompldr.org/vN3R6aA(Volume notification)! Захотелось чего то такого эдакого, решил сделать для себя отображение состояния звука при его изменении. Проще всего показалось сделать используя уведомления через notification-daemon (так оно и вышло, за исключением одной мелочи).

Основная проблема оказалась в том, что функционал notification-daemon не умеет убивать или заменять предыдущее сообщение новым, в связи с этим накапливается много сообщений о статусе. Я сделал указание позиции экрана, что немного помогло. Вам придётся самим найти оптимальную позицию для себя, редактируя последнюю строку в скрипте. -h int:x:<ваша точка позиции, она точно будет меньше разрешения экрана> -h int:y:<тоже самое только по вертикали>. В текущем скрипте я укажу левый верхний угол, так будет лучше всего. Смотрите сами.

    #!/bin/bash

    DESKTOP=:0 # need for notifications run 'over' display
    mixer_state=`amixer get Master | awk '$1=="Mono:" {print $6}'`
    x=`amixer get PCM | sed -rn "/[^[]+\[/{s///;s/%.+//p;q}"`
    z=$[x/10];  y='◼◼◼◼◼◼◼◼◼◼'
    zz=$[10-z];yy='◻◻◻◻◻◻◻◻◻◻'

    notify_title="Volume"

    case $x in
        0*|?|1?)  notify_icon="notification-audio-volume-off";;
        2?|3?|4?)  notify_icon="notification-audio-volume-low";;
        5?|6?|7?)  notify_icon="notification-audio-volume-medium";;
        8?|9?|100)  notify_icon="notification-audio-volume-high";;
    esac

    if [ $mixer_state == "[off]" ];then
        notify_icon="notification-audio-volume-muted"
        notify_title="$notify_title muted"
    fi

    notify-send -i $notify_icon -t 1500 -u low -h int:x:1015 -h int:y:200 \
    "$notify_title" "${y::z}${yy::zz} $x%"


Все настолько просто что и так ясно. Выполнить этот shell скрипт после изменения громкости. Например у меня OpenBox WM и я используя его возможности добавил запуск скрипта после команды изменения звука. Вот так:

    <keyboard>
        <keybind key="XF86AudioMute">
          <action name="Execute">
            <command>amixer -q set Master toggle</command>
          </action>
          <action name="Execute">
              <command>~/.bin/volume-notify</command>
          </action>
        </keybind>
        <keybind key="XF86AudioLowerVolume">
          <action name="Execute">
            <command>amixer -q set PCM 13- unmute</command>
          </action>
          <action name="Execute">
              <command>~/.bin/volume-notify</command>
          </action>
        </keybind>
        <keybind key="XF86AudioRaiseVolume">
          <action name="Execute">
            <command>amixer -q set PCM 13+ unmute</command>
          </action>
          <action name="Execute">
              <command>~/.bin/volume-notify</command>
          </action>
        </keybind>
        <!-- windows commands ... -->
    </keyboard>
