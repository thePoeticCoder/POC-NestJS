import { Inject, HttpException,HttpStatus } from '@nestjs/common';
var bcrypt = require('bcryptjs');
var HASH_SALT = bcrypt.genSaltSync(10);


export class EncryptionService {
    
    async encryptPassword(password:string) {
        try {
            const cipherText = await bcrypt.hash(password, HASH_SALT);
            return cipherText;
        } catch (e) {

            throw new HttpException('Unknown error' + e, HttpStatus.BAD_REQUEST);

        }
    }

    async comparePassword(simpleText : string , cipherText : string ) {
        try {
            const isMatched = await bcrypt.compare(simpleText, cipherText);
            return isMatched;
        } catch (err) {
            return null;
        }
    }



}









