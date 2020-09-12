# XOR Obfuscator

This is a utility I wrote to help me in solving a reverse engineering/forensics CTF. It encodes a string by XORing each character of the string with the next, then overwriting the next value with the result. Repeat until end of string. Decoding performs the reverse operation, taking in the raw data in the form of space delimited hexadecimal and producing the string.

In the CTF, this was used as as an obfuscation technique for input as plaintext for AES encryption, so it was vital to understand this obfuscation technique in order to solve the CTF. I wrote this utility to that end.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
