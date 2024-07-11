const  allLikeButton=document.querySelectorAll('.like-button')

async function likeButton(id,btn){
    try{
        const response=await axios({
            method:'post',
            url:`/products/${id}/like`,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'   
                /// header ->for btane k liye jaha post req ja ri h that it is AJAX request wrna AJAX ki tarah treat ni krega
            },

            
    
        });
        console.log("nhhh");
        console.log(btn.children);
        if(btn.children[0].classList.contains('fas')){
            btn.children[0].classList.remove('fas');
            btn.children[0].classList.add('far') 
        }
        else{
            btn.children[0].classList.add('fas')
            btn.children[0].classList.remove('far')
            
        }
        
    }
    catch(e){
        window.location.replace('/login');  // ye current location ko change krdega and we redirect to login page
        console.log(e.message);
    }
}
for(let btn of allLikeButton){
    btn.addEventListener('click',()=>{
        const productid=btn.getAttribute('product-id');

        likeButton(productid,btn);
    })
}