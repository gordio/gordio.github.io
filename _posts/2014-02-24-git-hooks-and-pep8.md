Проверка PEP8 при коммите в git. Аналогично можно прикрутить проверку кодировки, тестов, да и вообще чего угодно.

Во время разработки в команде желательно соблюдать стандарты, да и самому приятно. Но самому проверять каждую строчку, каждый коммит слишком накладно, да и человеческий фактор может подпортить все. Поэтому лучше оптимизировать этот процесс.

Git hook-и
----------

Система контроля версий git обладает вкусностями (уверен что остальные адекватные тоже умеют), позволяющими подключить выполнение команд на события. Список событий можно увидеть если выполнить:

	cd /tmp  # переход во временную директорию
	git init  # создаем новый
	ls .git/hooks  # здесь и получаем список
	rm -rf .git # удаляем

Это все события, на которые вы можете прицепить скрипты. В этом же случае будем цеплять к `pre-commit` проверять соблюдены ли PEP8 стандарты в измененных файлах и только в случае успеха принимать коммит.

На данный момент проверка включает в себя и предупреждения и останавливается. Я любитель табов поэтому добавил в настройки исключить предупреждение о табах. Если у вас есть предпочтения, просто добавьте их аналогично. И так сам скрипт:

	#!/usr/bin/env python
	from __future__ import with_statement
	import os
	import shutil
	import subprocess
	import sys
	import tempfile


	def system(*args, **kwargs):
		kwargs.setdefault('stdout', subprocess.PIPE)
		proc = subprocess.Popen(args, **kwargs)
		out, err = proc.communicate()
		return out


	def main():
		files = (
			file for file in system(
				'git', 'diff', '--name-only', '--staged', '--diff-filter=AM'
			).splitlines() if file.endswith('.py')
		)

		tempdir = tempfile.mkdtemp()
		for name in files:
			filename = os.path.join(tempdir, name)
			filepath = os.path.dirname(filename)
			# make dir if need
			if not os.path.exists(filepath):
				os.makedirs(filepath)
			with file(filename, 'w') as f:
				system('git', 'show', ':' + name, stdout=f)
		# W191 - ignore tabs warning
		output = system('pep8', '--ignore=W191', '.', cwd=tempdir)
		shutil.rmtree(tempdir)
		if output:
			print output,
			sys.exit(1)

	if __name__ == '__main__':
		main()

	# vim: set noet fenc= ff=unix sts=4 sw=4 ts=4 :


Планы
---

При обнаружении предупреждения спросить пользователя о продолжении или предотвращении коммита.
