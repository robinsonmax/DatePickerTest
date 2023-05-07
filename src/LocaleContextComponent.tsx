import { createContext, useState } from "react";

enum Locales {
  English = "en-gb",
  IncorrectEnglish = "en-us",
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
