import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../models/comment';
import { User } from '../models/user';
import { Reply } from '../models/reply';
import { ToAgoPipe } from '../Helpers/Pipes/to-ago.pipe';
import { CommentsService } from '../comments.service';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [ToAgoPipe, FormsModule, ModalComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit {

  onEditMode = false;
  showDeleteConfirmation = false;

  @Input() comment: Comment | Reply;
  @Input() currentUser: User;

  editedComment = '';
  shouldDeleteComment = false;

  constructor(private commentService: CommentsService) { }

  ngOnInit(): void {
    this.editedComment = this.comment.content;
  }

  editComment() {
    this.onEditMode = true;
  }

  onEditComment() {
    this.comment.content = this.editedComment;
    this.commentService.updateComment(this.comment);
    this.onEditMode = false;
  }

  onCancel() {
    this.onEditMode = false;
  }


  showConfirmationModal() {
    this.showDeleteConfirmation = true;
  }

  shouldDelete($event: any) {
    if ($event === true) {
      this.commentService.deleteComment(this.comment);
    }
  }

  shouldHideModal($event: any) {
    if ($event === true) {
      this.showDeleteConfirmation = false;
    }
  }



}