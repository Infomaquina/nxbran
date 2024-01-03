    import 'https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate';
		const el = document.createElement('pwa-update');
		document.body.appendChild(el);

		let deferredPrompt;
		const addApp = document.querySelector('#add-app');
      if($(".logar")){
         $(".logar").show()
         $(".install").hide()
         $("#loginGoogle").show()
      }

		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault();
			deferredPrompt = e;
         if($(".logar")){
            $(".logar").hide()
            $(".install").show()
            $("#loginGoogle").hide()
         }
		
			addApp.addEventListener('click', (e) => {
			$(addApp).html(`
				<i class="fa-solid text-white fa-lg fa-spinner fa-spin me-2"></i>
				<span class="h5 text-white">Confirmando</span>
			`).removeClass('btn-primary').addClass('btn-secondary')
			// Show the prompt
			deferredPrompt.prompt();
			// Wait for the user to respond to the prompt
			deferredPrompt.userChoice.then((choiceResult) => {
				if (choiceResult.outcome === 'accepted') {
					console.log('Usuario aceitou a instalação');
					location.reload();
				} else {
					console.log('User não aceitou a instalação');
					$(addApp).html(`
						<i class="fa-solid text-white fa-lg fa-download me-2 fa-bounce"></i>
						<span class="h5 text-white">Instalar App</span>
					`).removeClass('btn-secondary').addClass('btn-primary')
				}
				deferredPrompt = null;
				});
			});
		});