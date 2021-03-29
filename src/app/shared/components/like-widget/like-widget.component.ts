import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import { UniqueIdService } from '../../services/uniqueid/unique-id.service';

@Component({
  selector: 'app-like-widget',
  templateUrl: './like-widget.component.html',
  styleUrls: ['./like-widget.component.scss']
})
export class LikeWidgetComponent implements OnInit {
  @Input() public id = null;
  @Input() public likes = 0;
  @Output() public liked = new EventEmitter<void>();

  public fonts = {
    faThumbsUp
  };

  constructor(private uniqueIdService: UniqueIdService) { }

  public ngOnInit(): void {
    if (!this.id) {
      this.id = this.uniqueIdService.generateUniqueIdWithPrefix('like-widget');
    }
  }

  public like(): void {
    this.liked.emit();
  }
}