

export default class BaseImplementation {

   constructor(key) {
      //get it from session
      this.key_main = key;
      let collection_temp = localStorage.getItem(key);
      this.collection = collection_temp != null ? JSON.parse(collection_temp) : [];
   }

   /**
    * This function will be used to add data to session/local
    * @param {*} model  Model that needs to be added
    */
   Add(model) {
      let maxnum = this.arrayMax(this.collection);
      let new_id = maxnum + 1;
      model.id = new_id;
      this.collection.push(model);
      this.UpdateStore(this.collection);
   }

   Like(id) {
      let index = this.collection.findIndex((emp) => emp.id == id);
      this.collection[index].likes++;
      this.UpdateStore(this.collection);
   }

   Dislike(id) {
      let index = this.collection.findIndex((emp) => emp.id == id);
      this.collection[index].dislikes++;
      this.UpdateStore(this.collection);
   }

   Delete(id) {
      let index = this.collection.findIndex((emp) => emp.id == id);
      this.collection.splice(index, 1);
      this.UpdateStore(this.collection);
      alert(`You sure? (id : ${id})`);
  }

   arrayMax(arr) {
      if (arr.length == 0) {
         return 0;
      } else {
         let max_id = arr[0].id;
         arr.forEach(element => {
            if (element.id > max_id) max_id = element.id;
         });
         return max_id;
      }
   }

   UpdateStore(arr) {
      //let session_storage = 
      localStorage.setItem(this.key_main, JSON.stringify(arr));
   }

   populateTable(tableReference, arr = this.collection) {
      //using JS clear the table content
      tableReference.innerHTML = '';
      // let objLen = arr.length;
      //using JS build the tr tags and in loop keep appending the table

      arr.forEach(element => {
         let card = document.createElement('div');
         card.classList.add('card', 'col-lg-8', 'mx-auto');
         let data = `<div class="card-body">
                        <p><em>${element.name}</em></p>
                        <p><strong>${element.comment}</strong></p>
                        <div>
                           <span>${element.likes}</span><button id="${element.id}" onclick="likeComment(this)" class="btn like"><i class="fa-solid fa-thumbs-up"></i></button>
                           <span>${element.dislikes}</span><button id="${element.id}" onclick="dislikeComment(${element.id})" class="btn dislike"><i class="fa-solid fa-thumbs-down"></i></button>
                           <button id="${element.id}" class="btn" onclick="deleteComment(this)"><i class="fa-solid fa-trash"></i></button>
                        </div>
                     </div>`;
         card.innerHTML = data;
         tableReference.append(card);
      });
   }

}