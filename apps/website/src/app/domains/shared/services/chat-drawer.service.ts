import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatDrawerService {
  readonly #open = signal(false);
  readonly open = this.#open.asReadonly();

  toggle(): void {
    this.#open.update((o) => !o);
  }

  close(): void {
    this.#open.set(false);
  }

  setOpen(value: boolean): void {
    this.#open.set(value);
  }
}
