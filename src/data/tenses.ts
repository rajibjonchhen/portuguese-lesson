 
 type Tense = "present" | "past" | "future";

export const TENSES:{ key: Tense; label: string; en: string }[] = [
  { key:"present", label:"Presente", en:"Present" },
  { key:"past",    label:"Passado",  en:"Past" },
  { key:"future",  label:"Futuro",   en:"Future" },
]