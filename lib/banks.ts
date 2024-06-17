/**
 * Thai Banks
 * Ref: https://github.com/casperstack/banks-logo/tree/master
 */
const thaiBanks = {
  bbl: {
    color: "#1e4598",
    official_name_thai: "ธนาคารกรุงเทพ",
    nice_name: "Bangkok Bank",
    short_name: "bbl",
    image:
      "https://raw.githubusercontent.com/casperstack/banks-logo/master/th/bbl.svg",
  },
  kbank: {
    color: "#138f2d",
    official_name_thai: "ธนาคารกสิกรไทย",
    nice_name: "Kasikornbank",
    short_name: "kbank",
    image:
      "https://raw.githubusercontent.com/casperstack/banks-logo/master/th/kbank.svg",
  },
  ktb: {
    color: "#1ba5e1",
    official_name_thai: "ธนาคารกรุงไทย",
    nice_name: "Krungthai Bank",
    short_name: "ktb",
    image:
      "https://raw.githubusercontent.com/casperstack/banks-logo/master/th/ktb.svg",
  },
  scb: {
    color: "#4e2e7f",
    official_name_thai: "ธนาคารไทยพาณิชย์",
    nice_name: "Siam Commercial Bank",
    short_name: "scb",
    image:
      "https://raw.githubusercontent.com/casperstack/banks-logo/master/th/scb.svg",
  },
  ttb: {
    color: "#eeeeee",
    official_name_thai: "ธนาคารทีเอ็มบีธนชาต",
    nice_name: "TMB Thanachart Bank",
    short_name: "ttb",
    image:
      "https://raw.githubusercontent.com/casperstack/banks-logo/master/th/ttb.svg",
  },
  tmb: {
    color: "#1279be",
    official_name_thai: "ธนาคารทหารไทย",
    nice_name: "TMB Bank",
    short_name: "tmb",
    image:
      "https://raw.githubusercontent.com/casperstack/banks-logo/master/th/tmb.svg",
  },
  uob: {
    color: "#0b3979",
    official_name_thai: "ธนาคารยูโอบี",
    nice_name: "United Overseas Bank (Thai)",
    short_name: "uob",
    image:
      "https://raw.githubusercontent.com/casperstack/banks-logo/master/th/uob.svg",
  },
  cimb: {
    color: "#7e2f36",
    official_name_thai: "ธนาคารซีไอเอ็มบี",
    nice_name: "CIMB Thai Bank",
    short_name: "cimb",
    image:
      "https://raw.githubusercontent.com/casperstack/banks-logo/master/th/cimb.svg",
  },

  bay: {
    color: "#fec43b",
    official_name_thai: "ธนาคารกรุงศรีอยุธยา",
    nice_name: "Krungsri",
    short_name: "bay",
    image:
      "https://raw.githubusercontent.com/casperstack/banks-logo/master/th/bay.svg",
  },
  gsb: {
    color: "#eb198d",
    official_name_thai: "ธนาคารออมสิน",
    nice_name: "Government Savings Bank",
    short_name: "gsb",
    image:
      "https://raw.githubusercontent.com/casperstack/banks-logo/master/th/gsb.svg",
  },

  baac: {
    color: "#4b9b1d",
    official_name_thai: "ธนาคารเพื่อการเกษตร",
    nice_name: "Bank for Agriculture and Agricultural Cooperatives",
    short_name: "baac",
    image:
      "https://raw.githubusercontent.com/casperstack/banks-logo/master/th/baac.svg",
  },
  kkp: {
    color: "#199cc5",
    official_name_thai: "ธนาคารเกียรตินาคิน",
    nice_name: "Kiatnakin Bank",
    short_name: "kkp",
    image:
      "https://raw.githubusercontent.com/casperstack/banks-logo/master/th/kkp.svg",
  },
  icbc: {
    color: "#c50f1c",
    official_name_thai: "ธนาคารไอซีบีซี",
    nice_name: "Industrial and Commercial Bank of China (Thai)",
    short_name: "icbc",
    image:
      "https://raw.githubusercontent.com/casperstack/banks-logo/master/th/icbc.svg",
  },
  lhb: {
    color: "#6d6e71",
    official_name_thai: "ธนาคารแลนด์ แอนด์ เฮ้าส์ ",
    nice_name: "Land and Houses Bank",
    short_name: "lhb",
    image:
      "https://raw.githubusercontent.com/casperstack/banks-logo/master/th/lhb.svg",
  },
};

type ThaiBanks = typeof thaiBanks;
export type ThaiBankKeys = keyof ThaiBanks;
export type ThaiBank = ThaiBanks[keyof ThaiBanks];
export { thaiBanks };
