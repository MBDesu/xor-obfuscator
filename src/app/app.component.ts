import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  inputForm: FormGroup;
  xorBlocks: string[];
  unXorString: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      plaintext: []
    });
  }

  xorObfuscate(): void {
    this.resetResults();
    const input = (this.inputForm.get('plaintext').value as string).match(/(.{1,16})/g);
    const resultBlocks: string[] = [];
    for (const block of input) {
      const blockCharCodes = this.stringToAES128Blocks(block);
      for (let i = 0; i < blockCharCodes.length - 1; i++) {
        // tslint:disable-next-line: no-bitwise
        blockCharCodes[i + 1] = blockCharCodes[i] ^ blockCharCodes[i + 1];
      }
      let hex = '';
      blockCharCodes.forEach((code) => {
        hex += this.decToHexString(code) + ' ';
      });
      resultBlocks.push(hex.trim());
    }
    this.xorBlocks = resultBlocks;
  }

  xorDeobfuscate(): void {
    this.resetResults();
    let str = '';
    const input = this.inputForm.get('plaintext').value as string;
    const values = input.split(' ').map((value) => {
      return parseInt(value, 16);
    });
    const blocks = this.splitArrToAES128Blocks(values);
    for (const block of blocks) {
      str += String.fromCharCode(block[0]);
      for (let i = 0; i < block.length - 1; i++) {
        // tslint:disable-next-line: no-bitwise
        str += String.fromCharCode(block[i] ^ block[i + 1]);
      }
    }
    this.unXorString = str;
  }

  private resetResults(): void {
    this.unXorString = '';
    this.xorBlocks = [];
  }

  private stringToAES128Blocks(input: string): number[] {
    const arr = [];
    const len = input.length;
    const diff = 16 - len;
    for (let i = 0; i < len; i++) {
      arr.push(input.charCodeAt(i));
    }
    if (diff > 0) {
      arr.push(10); // 0xA byte pad
    }
    for (let i = 0; i < diff - 1; i++) {
      arr.push(0); // NULL byte padding
    }
    return arr;
  }

  private decToHexString(val: number): string {
    return val < 16 ? '0' + val.toString(16).toUpperCase() : val.toString(16).toUpperCase();
  }

  private splitArrToAES128Blocks(arr: number[]): number[][] {
    const res = [];
    for (let i = 0; i < arr.length; i += 16) {
      res.push(arr.slice(i, i + 16));
    }
    return res;
  }

}
