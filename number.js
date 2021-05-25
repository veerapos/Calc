function Calc(n1, n2, opr) {
    // สำหรับคำนวณการบวกหรือลบตัวเลขสองตัว (n1, n2)
    if(opr == '+'){
        return n1 + n2
    }
    else{
        return n1 - n2
    }
}

function result(t) {
    /* parameter t ที่ส่งมาให้ function จะมีรูปแบบเป็น
       -245 หรือ -245+677 หรือ +245 หรือ +245-456 หรือ 245 หรือ 245+677 หรือ 245-456
       ขั้นตอนการทำงานจะเริ่มด้วยการหาตัวเลขชุดแรกให้ได้ก่อน 
       เมื่อได้ตัวเลขชุดแรกแล้ว จึงค่อยหาตัวเลขชุดต่อ ๆ ไปนำมาบวกหรือลบตามเครื่องหมาย
       ตัวเลขแต่ละชุดคือ string ที่มีเครื่องหมาย + - ขั้นไว้
    */
    var r = 0.0, rTxt = '0'     // สำหรับตัวเลขชุดแรก --> ตัวเลขด้านซ้ายของ operator
    var rr = 0.0, rrTxt = '0'   // สำหรับตัวเลขชุดที่ 2,3,4, ... --> ตัวเลขขวาของ operator
    var operator = '+'
    var i = t.length
    var j = 0

    // หาตัวเลขชุดที่หนึ่ง
    r = 0.0     // เก็บค่าที่เป็นตัวเลข type เป็น number ให้ค่าเริ่มต้นเป็น 0.0
    rTxt = '0'  // เก็บ string ของตัวเลข  ให้ค่าเริ่มต้นเป็น 0 ซึ่งสามารถนำไปบวกลบกับจำนวนอื่นโดยค่าไม่เปลี่ยน
    j = 0

    while(j < i && t[j] != '+' && t[j] != '-') {
        rTxt += t[j]       // เอาตัวเลขแต่ละตัวมาต่อกัน
        r = Number(rTxt)   // แปลงชุดตัวเลขจาก string ให้เป็น number
        j++
    }

    // หาตัวเลขชุดต่อ ๆ ไป และ เครื่องหมาย + -
    rr = 0.0       // เก็บค่าที่เป็นตัวเลข type เป็น number
    rrTxt = '0'    // เก็บ string ของตัวเลข

    while(j < i){
        if (t[j] == '+' || t[j] == '-') {  // พบเครื่องหมาย +- ทำการคำนวณค่าชุดตัวเลขก่อนหน้า
            r = Calc(r, rr, operator)
            operator = t[j]
            rr = 0.0        // reset เป็นค่าเริ่มต้น
            rrTxt = '0'     // reset เป็นค่าเริ่มต้น
        }
        else{
            rrTxt += t[j]
            rr = Number(rrTxt)
        }
        j++
    }
    r = Calc(r, rr, operator) // คำนวณตัวเลขชุดสุดท้าย

    return r
}

function numberPad(n){
    /* รับค่า event OnClick จากหน้า webpage 0..9 + - = Clear */
    var t = document.getElementById('line').innerHTML  // ข้อความ string
    var i = document.getElementById('line').innerHTML.length  // ความยาวของ string
    var x = document.getElementById('line').innerHTML[i-1] // ตัวอักษรสุดท้ายของ string

    if(t.search('=') != -1 && n!=='='){ 
        /* ถ้าใน string มีเครื่องหมาย = ผสมอยู่ แสดงว่าครั้งก่อนกดปุ่ม = เพื่อหาผลลัพธ์ไปแล้ว 
           ให้ทำการ clear ค่า string เป็นว่างเพื่อเริ่มต้นใหม่ แต่ถ้ากด = อีกครั้งจะไม่ทำอะไร
        */
        document.getElementById('line').innerHTML = ''

        // กำหนดค่าเริ่มต้นให้กับตัวแปร
        t = document.getElementById('line').innerHTML
        i = document.getElementById('line').innerHTML.length
        x = document.getElementById('line').innerHTML[i-1]
    }

    if(n=='Clear') {
        document.getElementById('line').innerHTML = ''
    }

    else if(n == '+') {
        if (x == '+' || x == '-'){  // ถ้าตัวสุดท้ายเป็น operator ให้ตัดทิ้ง แล้วต่อด้วย +
            document.getElementById('line').innerHTML = t.substr(0,i-1) + '+'
        }
        else {
            document.getElementById('line').innerHTML += '+'
        }
    }

    else if(n == '-') {
        if (x == '+' || x == '-'){   // ถ้าตัวสุดท้ายเป็น operator ให้ตัดทิ้ง แล้วต่อด้วย -
            document.getElementById('line').innerHTML = t.substr(0,i-1) + '-'
        }
        else {
            document.getElementById('line').innerHTML += '-'
        }
    }
    
    else if(n == '=') {
        if(i != 0 && t.search('=') == -1){  
        /* ความยาว string ไม่เท่ากับ 0 แสดงว่ามีการกดตัวเลขหรือ operator แล้ว
           จะทำการคำนวณผลลัพธ์  แต่ถ้ายังไม่ได้กดตัวเลขหรือ operator จะไม่ทำอะไร
           หรือ ถ้ากด = ซ้ำก็จะไม่ทำอะไร
        */
            if(x == '+' || x == '-'){  // ถ้าตัวสุดท้ายเป็น operator ให้ตัดทิ้ง
                document.getElementById('line').innerHTML = t.substr(0,i-1)     
            }
            document.getElementById('line').innerHTML += 
            (' = ' + result(document.getElementById('line').innerHTML))  
        }
    }
    
    else {
        document.getElementById('line').innerHTML += n
    }

}
