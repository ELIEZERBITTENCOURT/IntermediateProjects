const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_-+={}[];:,.<>?';

function generatePassword() {
	const length = document.getElementById('length').value;
	const strength = document.getElementById('strength').value;

	let charset = lowerCase;
	if (strength >= 2) {
		charset += upperCase;
	}
	if (strength >= 3) {
		charset += numbers + symbols;
	}

	let password = '';
	for (let i = 0; i < length; i++) {
		password += charset.charAt(Math.floor(Math.random() * charset.length));
	}

	return password;
}

function copyPassword() {
	const password = document.getElementById('password').textContent;
	navigator.clipboard.writeText(password).then(function () {
		alert('Senha copiada para a área de transferência.');
	}, function () {
		alert('Não foi possível copiar a senha para a área de transferência.');
	});
}

document.getElementById('generate').addEventListener('click', function () {
	const password = generatePassword();
	document.getElementById('password').textContent = password;
	document.querySelector('.output').style.display = 'block';
});

document.getElementById('copy').addEventListener('click', function () {
	copyPassword();
});

