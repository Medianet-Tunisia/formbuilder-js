/**
 * Base URL des "resources" internes (modèles Eloquent exposés par le back-office),
 * utilisée à la place de l'API SaaS form.io (https://api.form.io) qui répond 401.
 *
 * La valeur est injectée par la vue Blade via window.FORMIO_INTERNAL_RESOURCES_URL,
 * dans un <script> placé AVANT le chargement de formio.full.min.js : ces constantes
 * sont évaluées à l'import du bundle, pas au moment de la requête.
 *
 * Ne jamais coder l'URL en dur ici : le bundle est compilé une fois et servi
 * sur plusieurs environnements (dev / préprod / prod).
 */
const DEFAULT_INTERNAL_RESOURCES_URL = '/api/formio/resources';

/**
 * L'URL doit être ABSOLUE. ListComponent.updateItems() (case 'url') préfixe toute
 * URL commençant par '/' avec `Formio.getProjectUrl() || Formio.getBaseUrl()`, soit
 * https://api.form.io en l'absence de projet configuré : une URL relative repartirait
 * donc vers le SaaS. On résout ici contre l'origine courante.
 */
function toAbsoluteUrl(url) {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  if (typeof window !== 'undefined' && window.location) {
    try {
      return new URL(url, window.location.href).href;
    }
    catch (err) {
      // Environnement sans URL() utilisable (tests headless) : on renvoie tel quel.
    }
  }

  return url;
}

function resolveInternalResourcesUrl() {
  const configured = (typeof window !== 'undefined') && window.FORMIO_INTERNAL_RESOURCES_URL;

  return toAbsoluteUrl(String(configured || DEFAULT_INTERNAL_RESOURCES_URL)).replace(/\/+$/, '');
}

// Liste des modèles : [{ _id: 'Document', title: 'Document' }, ...]
export const INTERNAL_RESSOURCES = resolveInternalResourcesUrl();

// Détail d'un modèle, au format "form" attendu par onSetItems() : { type, components: [...] }
// {{ data.data.resource }} est interpolé par form.io au moment de la requête.
export const INTERNAL_RESSOURCE_DETAIL = `${INTERNAL_RESSOURCES}/{{ data.data.resource }}`;
