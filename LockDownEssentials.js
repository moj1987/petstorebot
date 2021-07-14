const Order = require("./Order");

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  CUT: Symbol("cut"),
  LENGTH: Symbol("length"),
  EXTRAS: Symbol("extras"),
});

module.exports = class LockDownEssentials extends Order {
  constructor(sNumber, sUrl) {
    super(sNumber, sUrl);
    this.stateCur = OrderState.WELCOMING;
    this.sSpecies = "";
    this.sFood = "";
    this.sLitter = "";
    this.sExtras = "";
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        aReturn.push("Welcome to Moj's hair cut.");
        aReturn.push(`The list of what we sell tap:`);
        aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);
        if (sInput.toLowerCase() == "men") {
          this.stateCur = OrderState.CUT;
          this.sSpecies = "men";
        } else if (sInput.toLowerCase() == "women") {
          this.stateCur = OrderState.CUT;
          this.sSpecies = "women";
        } else {
          this.stateCur = OrderState.WELCOMING;
          aReturn.push(
            "Please type MEN if you have a men cut or WOMEN if you have a women cut."
          );
          break;
        }
        aReturn.push("Would you like SHORT or LONG hair or NO?");
        break;
      case OrderState.CUT:
        if (this.sSpecies == "men") {
          this.stateCur = OrderState.LENGTH;
          aReturn.push("Would you like coloring?");
        } else {
          this.stateCur = OrderState.EXTRAS;
          aReturn.push("Would you like a neck massage?");
        }
        if (sInput.toLowerCase() != "no") {
          this.sFood = sInput;
        }
        break;
      case OrderState.LENGTH:
        this.stateCur = OrderState.EXTRAS;
        if (sInput.toLowerCase() != "no") {
          this.sLitter = "white color lol";
        }
        aReturn.push("Would you like a neck massage?");
        break;
      case OrderState.EXTRAS:
        if (sInput.toLowerCase() != "no") {
          this.sExtras = sInput;
        }
        aReturn.push("Your cut will consist of");
        this.nTotal = 0;
        if (this.sSpecies == "men" && this.sFood.toLowerCase() == "short") {
          aReturn.push("short men haircut");
          this.nTotal += 10;
        } else if (this.sSpecies == "men" && this.sFood.toLowerCase == "long") {
          aReturn.push("long men haircut");
          this.nTotal += 15;
        } else if (
          this.sSpecies == "women" &&
          this.sFood.toLowerCase() == "short"
        ) {
          aReturn.push("short women haircut");
          this.nTotal += 15;
        } else if (
          this.sSpecies == "women" &&
          this.sFood.toLowerCase == "long"
        ) {
          aReturn.push("long men haircut");
          this.nTotal += 20;
        }
        if (this.sLitter) {
          aReturn.push(this.sLitter);
          this.nTotal += 30;
        }
        if (this.sExtras) {
          aReturn.push(this.sExtras);
          this.nTotal += 35;
        }
        aReturn.push(`Your total comes to ${this.nTotal}`);
        aReturn.push(
          `We will text you from 519-222-2222 when your order is ready or if we have questions.`
        );
        this.isDone(true);
        break;
    }
    return aReturn;
  }
  renderForm() {
    // your client id should be kept private
    return `
      <html><head><meta content="text/html; charset=UTF-8" http-equiv="content-type"><style type="text/css">ol{margin:0;padding:0}table td,table th{padding:0}.c9{border-right-style:solid;padding:5pt 5pt 5pt 5pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:64.6pt;border-top-color:#000000;border-bottom-style:solid}.c1{border-right-style:solid;padding:5pt 5pt 5pt 5pt;border-bottom-color:#000000;border-top-width:1pt;border-right-width:1pt;border-left-color:#000000;vertical-align:top;border-right-color:#000000;border-left-width:1pt;border-top-style:solid;border-left-style:solid;border-bottom-width:1pt;width:201.7pt;border-top-color:#000000;border-bottom-style:solid}.c0{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left;height:11pt}.c5{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:24pt;font-family:"Arial";font-style:normal}.c2{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:"Arial";font-style:normal}.c7{padding-top:0pt;padding-bottom:0pt;line-height:1.15;orphans:2;widows:2;text-align:left}.c8{border-spacing:0;border-collapse:collapse;margin-right:auto}.c3{padding-top:0pt;padding-bottom:0pt;line-height:1.0;text-align:left}.c10{background-color:#ffffff;max-width:468pt;padding:72pt 72pt 72pt 72pt}.c4{height:11pt}.c6{height:0pt}.title{padding-top:0pt;color:#000000;font-size:26pt;padding-bottom:3pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}.subtitle{padding-top:0pt;color:#666666;font-size:15pt;padding-bottom:16pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}li{color:#000000;font-size:11pt;font-family:"Arial"}p{margin:0;color:#000000;font-size:11pt;font-family:"Arial"}h1{padding-top:20pt;color:#000000;font-size:20pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h2{padding-top:18pt;color:#000000;font-size:16pt;padding-bottom:6pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h3{padding-top:16pt;color:#434343;font-size:14pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h4{padding-top:14pt;color:#666666;font-size:12pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h5{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;orphans:2;widows:2;text-align:left}h6{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.15;page-break-after:avoid;font-style:italic;orphans:2;widows:2;text-align:left}</style></head><body class="c10"><p class="c7"><span class="c2">For curbside haricut:</span></p><p class="c7"><span class="c5">Text &ldquo;hair&rdquo; or &ldquo;moj&rdquo; to 519-111-1111</span></p><p class="c0"><span class="c2"></span></p><p class="c7"><span class="c2">Moj barber on the go :D</span></p><p class="c7"><span class="c2">Yeah!! It&rsquo;s real. </span></p><p class="c7"><span class="c2">You can get a haircut on your driveway. </span></p><p class="c7"><span class="c2">Yup! We are gonna clean up the mess. </span></p><p class="c0"><span class="c2"></span></p><p class="c7"><span class="c2">Here is the pricing. </span></p><p class="c0"><span class="c2"></span></p><p class="c0"><span class="c2"></span></p><a id="t.1ce66a723d7bad607ccebf9584f14ef9bc427827"></a><a id="t.0"></a><table class="c8"><tbody><tr class="c6"><td class="c1" colspan="1" rowspan="1"><p class="c3"><span class="c2">Gentleman&#39;s haircut</span></p></td><td class="c1" colspan="1" rowspan="1"><p class="c3 c4"><span class="c2"></span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c3 c4"><span class="c2"></span></p></td></tr><tr class="c6"><td class="c1" colspan="1" rowspan="1"><p class="c3 c4"><span class="c2"></span></p></td><td class="c1" colspan="1" rowspan="1"><p class="c3"><span class="c2">Short cut</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c3"><span class="c2">10</span></p></td></tr><tr class="c6"><td class="c1" colspan="1" rowspan="1"><p class="c3 c4"><span class="c2"></span></p></td><td class="c1" colspan="1" rowspan="1"><p class="c3"><span class="c2">Long cut</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c3"><span class="c2">15</span></p></td></tr><tr class="c6"><td class="c1" colspan="1" rowspan="1"><p class="c3"><span class="c2">Ladies haircut</span></p></td><td class="c1" colspan="1" rowspan="1"><p class="c3 c4"><span class="c2"></span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c3 c4"><span class="c2"></span></p></td></tr><tr class="c6"><td class="c1" colspan="1" rowspan="1"><p class="c3 c4"><span class="c2"></span></p></td><td class="c1" colspan="1" rowspan="1"><p class="c3"><span class="c2">Short cut</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c3"><span class="c2">15</span></p></td></tr><tr class="c6"><td class="c1" colspan="1" rowspan="1"><p class="c3 c4"><span class="c2"></span></p></td><td class="c1" colspan="1" rowspan="1"><p class="c3"><span class="c2">Long cut</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c3"><span class="c2">20</span></p></td></tr><tr class="c6"><td class="c1" colspan="1" rowspan="1"><p class="c3"><span class="c2">Coloring </span></p></td><td class="c1" colspan="1" rowspan="1"><p class="c3 c4"><span class="c2"></span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c3"><span class="c2">30</span></p></td></tr><tr class="c6"><td class="c1" colspan="1" rowspan="1"><p class="c3"><span class="c2">Neck massage (15 mins)</span></p></td><td class="c1" colspan="1" rowspan="1"><p class="c3 c4"><span class="c2"></span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c3"><span class="c2">35</span></p></td></tr></tbody></table><p class="c0"><span class="c2"></span></p></body></html>      `;
  }
};
