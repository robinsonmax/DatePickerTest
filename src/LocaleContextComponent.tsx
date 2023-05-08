import { createContext, useState } from "react";

enum Locales {
  English = "en-GB",
  IncorrectEnglish = "en-US",
  German = "de-DE",
}

export const LocaleContext = createContext<Locales>(Locales.English);

export default function LocaleContextComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale] = useState<Locales>(Locales.English);

  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}
