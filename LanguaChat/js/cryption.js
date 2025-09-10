let key;
//generate the key
export async function generateKey(){
    key = await crypto.subtle.generateKey(
        { name: "AES-CTR", length: 256 },true,["encrypt", "decrypt"]
    );
    return key;
}

//encryption AES
export  async function encryptMessage(message) {
    const counter=crypto.getRandomValues(new Uint8Array(16));//new random counter for each message
    const encoded =new TextEncoder().encode(message);

    const ciphertext=await crypto.subtle.encrypt(
        {name:"AES-CTR",counter,length:64},key,encoded 
    );

    return{ciphertext:new Uint8Array(ciphertext),counter};
}
//decrypts messages AES
export async function decryptMessage(){
    const decrypted =await crypto.subtle.decrypt(
        {name:"AES-CTR", counter, length:64},key,ciphertext
    );
    return new TextDecoder().decode(decrypted);
}