;(function() {
    'use strict';
    class UserInfo{
        constructor(el) {
            //User Classes
            this.userAmount = $(el).find('.user__amount');
            this.userName = $(el).find('.user__name');
            this.handleTopUpButtonOpen = $(el).find('.button__top-up--open');

            //Pop-Up Classes
            this.topUpPopUp = $('body').find('.top-up__pop-up');
            this.amountWrapper = $('body').find('.amount__wrapper');
            this.handleTopUpButtonClose = $('body').find('.button__top-up--close');
            this.handleLinkToCopy = $('body').find('.button__hash-for-copy');


            this.handleTopUpClick = this.handleTopUpClick.bind(this);
            this.handleTopUpClickClose = this.handleTopUpClickClose.bind(this);

            this.attachEvents();
            this.getUserInfo();

        }

        attachEvents() {
			this.handleTopUpButtonOpen.on('click', this.handleTopUpClick);
			this.handleTopUpButtonClose.on('click', this.handleTopUpClickClose);
            this.amountWrapper.on('click', this.handleLinkToCopy, this.handleLinkToCopyClick)
        }
        
        handleTopUpClick(event){
            event.preventDefault();

            this.topUpPopUp.addClass('top-up__pop-up--show');
            this.getAmountInfo();
        }

        handleLinkToCopyClick(event){
            event.preventDefault();
            const hashToCopy = event.target;
            const range = document.createRange();

            range.selectNode(hashToCopy);
            window.getSelection().addRange(range);

            try {
                const successful = document.execCommand('copy');
                const msg = successful ? 'successful' : 'unsuccessful';
                console.log('Copy email command was ' + msg);
            } catch(err) {
                console.log('Oops, unable to copy');
            }

            window.getSelection().removeAllRanges();
        }

        handleTopUpClickClose(event){
            event.preventDefault();

            this.topUpPopUp.removeClass('top-up__pop-up--show');
            this.amountWrapper.html(' ');
        }

        getUserInfo(){
            const self = this;
			const xhr = new XMLHttpRequest();
			const apiUrl = `./data/user.json`;

            this.xhrRequest = true;
            
            xhr.open('GET', apiUrl , true);
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.send();

            xhr.onreadystatechange = function () {
                if ( this.status === 200 ) {
                    if ( this.readyState === 4 ) {
                        const data = JSON.parse(this.response);
                        const name = data.name.first + " " + data.name.last;
                        const balance = data.balance;


                        self.userName.text(name);
                        self.userAmount.text(balance);
                    }
                } else {
                    console.error(this.status + ':' + this.statusText);
                }
            }
        }

        getAmountInfo(){
            const self = this;
            const xhr = new XMLHttpRequest();
            const apiUrl = `./data/amount.json`;

            this.xhrRequest = true;

            xhr.open('GET', apiUrl , true);
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.send();

            xhr.onreadystatechange = function () {
                if ( this.status === 200 ) {
                    if ( this.readyState === 4 ) {
                        const data = JSON.parse(this.response);
                        self.amountWrapper.html(' ');

                        data.forEach(function (element) {
                            const elHash = element['_id'];
                            const elAmount = element['amount'];

                            $(self.createAmountLine(elAmount,elHash)).appendTo(self.amountWrapper);
                        });
                    }
                } else {
                    console.error(this.status + ':' + this.statusText);
                }
            }
        }

        createAmountLine(cost,hash){
            return `<li><a href="#" class="button__hash-for-copy" title="Click to copy" data-hash="${hash}">${hash}</a> ${cost}</li>`
        }

    }


    $(function() {
        const elems = $(".user");

        if ( ! elems.length ) {
            return;
        }

        elems.each(function() {
            new UserInfo(this);
        });
	});
})();