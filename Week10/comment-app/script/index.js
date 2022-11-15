import BaseImplementation from "../implementation/baseImplementation.js";
import Comment from "../model/comment.js"

let implementation = new BaseImplementation('comments');
let tableReference = document.getElementById('comments');

function addComment(nameStr, commentStr) {
   let commentModel = new Comment();
   commentModel.name = nameStr;
   commentModel.comment = commentStr;
   implementation.Add(commentModel);
   implementation.populateTable(tableReference);
}

function likeComment(element) {
   let id = element.getAttribute('id');
   implementation.Like(id);
   implementation.populateTable(tableReference);
}

window.likeComment = likeComment;

function dislikeComment(id) {
   implementation.Dislike(id);
   implementation.populateTable(tableReference);
}

window.dislikeComment = dislikeComment;

function deleteComment(element) {
   let id = element.getAttribute('id');
   implementation.Delete(id);
   implementation.populateTable(tableReference);
}

window.deleteComment = deleteComment;

window.onload = implementation.populateTable(tableReference);

let name = document.getElementById('name');
let comment = document.querySelector('textarea');
document.querySelector('#add-comment').addEventListener('click', () => {
   addComment(name.value, comment.value);
});