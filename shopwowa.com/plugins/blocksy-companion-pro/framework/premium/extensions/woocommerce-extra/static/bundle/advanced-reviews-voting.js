!function(){"use strict";(0,window.ctFrontend.registerDynamicChunk)("blocksy_ext_woo_extra_advanced_reviews_voting",{mount:function(t,e){e.event;var o="active"===t.dataset.buttonState,n="up"===t.dataset.vote;t.dataset.buttonState="loading",fetch("".concat(ct_localizations.ajax_url,"?action=ct_review_vote"),{method:"POST",body:JSON.stringify({comment_id:t.dataset.commentId,vote:t.dataset.vote}),headers:{Accept:"application/json","Content-Type":"application/json"}}).then((function(t){return t.json()})).then((function(e){var a=e.votes,c=e.upvotes,i=e.total;if(a){var r=t.closest(".ct-review-votes");r.querySelector(".ct-review-upvote-count").textContent=c,r.querySelector(".ct-review-vote-count").dataset.count=c,r.querySelector(".ct-review-total-count").textContent=i,t.dataset.buttonState=o?"":"active",o||(r.querySelector("[data-vote=".concat(n?"down":"up","]")).dataset.buttonState="")}}))}})}();