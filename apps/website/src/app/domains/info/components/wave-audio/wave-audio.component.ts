import {
  Component,
  ElementRef,
  signal,
  input,
  viewChild,
  afterNextRender,
  ChangeDetectionStrategy,
} from '@angular/core';


import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wave-audio',
  imports: [],
  templateUrl: './wave-audio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaveAudioComponent {
  readonly audioUrl = input.required<string>();
  $waveContainerRef = viewChild.required<ElementRef<HTMLDivElement>>('wave');
  private ws!: WaveSurfer;
  isPlaying = signal(false);

  constructor() {
    afterNextRender(() => {
      this.ws = WaveSurfer.create({
        url: this.audioUrl(),
        container: this.$waveContainerRef().nativeElement,
      });
      this.ws.on('play', () => this.isPlaying.set(true));
      this.ws.on('pause', () => this.isPlaying.set(false));
    });
  }

  playPause() {
    this.ws.playPause();
  }
}
