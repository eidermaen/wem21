const toolbar = document.getElementById('toolbar');

const toolbarItems = toolbar.querySelectorAll('a');
toolbarItems.forEach(node => {
	node.onclick = e => {
		e.stopPropagation();
		const target = e.target;
		const command = target.dataset.command;

		if (['h1', 'h2', 'p'].includes(command)) {
			document.execCommand('formatBlock', false, command);
		}
		else if (['forecolor', 'backcolor'].includes(command)) {
			document.execCommand(command, false, target.dataset.value);
		}
		else if (['createLink', 'insertimage'].includes(command)) {
			const url = prompt('Enter the link here:', 'https:\/\/');
			document.execCommand(command, false, url);
		}
		else {
			document.execCommand(command, false, null);
		}
	}
})
