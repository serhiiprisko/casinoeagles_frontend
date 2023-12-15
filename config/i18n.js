import en from '../locales/en.json'
import fr from '../locales/fr.json'
import cn from '../locales/cn.json'
import de from '../locales/de.json'
import fi from '../locales/fi.json'
import iin from '../locales/in.json'
import it from '../locales/it.json'
import no from '../locales/no.json'
import ru from '../locales/ru.json'
import se from '../locales/se.json'
import tr from '../locales/tr.json'
import { numberFormats } from './numberFormats'

export default {
  locale: 'en',
  fallbackLocale: 'en',
  numberFormats,
  messages: { en, fr, cn, de, fi, in: iin, it, no, ru, se, tr }
}
