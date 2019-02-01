;(function() {
    'use strict';
    class UserInfo{
        constructor(userElem,popUpElem) {
            //User Classes
            this.userAmount = $(userElem).find('.user__amount');
            this.userName = $(userElem).find('.user__name');
            this.handleTopUpButtonOpen = $(userElem).find('.button__top-up--open');

            //Pop-Up Classes
            this.topUpPopUp = $(popUpElem);
            this.amountWrapper = $(popUpElem).find('.amount__wrapper');
            this.handleTopUpButtonClose = $(popUpElem).find('.button__top-up--close');
            this.handleLinkToCopy = $(popUpElem).find('.button__hash-for-copy');

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
        const userElem = $(".user");
        const popUpelem = $(".top-up__pop-up");

        new UserInfo(userElem, popUpelem);
	});
})();
