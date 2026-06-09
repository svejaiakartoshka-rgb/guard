// AVK Guard Portal v18

window.AVK_SUPABASE_URL = "https://gckjpltgyvzrfxshyvrx.supabase.co";
window.AVK_SUPABASE_ANON_KEY = "sb_publishable_onFrGnEJP0Iws1xAVL1xeg_-iH7d3HY";
window.AVK_INTERNAL_EMAIL_DOMAIN = "avk.local";

window.avkSupabase = window.supabase.createClient(
  window.AVK_SUPABASE_URL,
  window.AVK_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      storage: window.localStorage,
      storageKey: "avk-guard-portal-auth"
    }
  }
);

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const OWNER_USER_ID = "1b7d9ea7-e5d1-4629-bdee-4f94d6843901";
const ROLE_LEVEL = { enlisted: 1, sergeant: 2, officer: 3, senior_officer: 4, admin: 5 };
const RANK_LEVEL = {
  REC: 1,
  PVT: 2,
  PV2: 3,
  PV1: 4,
  SPC: 5,
  LCPL: 6,
  CPL: 7,
  SGT: 8,
  SFC: 9,
  MSG: 10,
  JLT: 11,
  LT: 12,
  SLT: 13,
  CPT: 14,
  MAJ: 15,
  CO: 16,
  SCO: 17,
  MCO: 18,
};
const SERGEANT_MIN_RANK = "SGT";
const OFFICER_MIN_RANK = "JLT";
const DEFAULT_RANKS = [
  { code: "REC", name: "Рекрут", sort_order: 10 },
  { code: "PVT", name: "Рядовой", sort_order: 20 },
  { code: "PV2", name: "Рядовой 2-го класса", sort_order: 30 },
  { code: "PV1", name: "Рядовой 1-го класса", sort_order: 40 },
  { code: "SPC", name: "Специалист", sort_order: 50 },
  { code: "LCPL", name: "Младший капрал", sort_order: 60 },
  { code: "CPL", name: "Капрал", sort_order: 70 },
  { code: "SGT", name: "Сержант", sort_order: 80 },
  { code: "SFC", name: "Сержант 1-го класса", sort_order: 90 },
  { code: "MSG", name: "Мастер-сержант", sort_order: 100 },
  { code: "JLT", name: "Младший лейтенант", sort_order: 110 },
  { code: "LT", name: "Лейтенант", sort_order: 120 },
  { code: "SLT", name: "Старший лейтенант", sort_order: 130 },
  { code: "CPT", name: "Капитан", sort_order: 140 },
  { code: "MAJ", name: "Майор", sort_order: 150 },
  { code: "CO", name: "Командор", sort_order: 160 },
  { code: "SCO", name: "Старший командор", sort_order: 170 },
  { code: "MCO", name: "Маршал-командор", sort_order: 180 },
];
const ROLE_LABELS = {
  enlisted: "Рядовой состав",
  sergeant: "Сержантский состав",
  officer: "Офицерский состав",
  senior_officer: "Старший офицерский состав",
  admin: "Администратор",
};
const FIGHTER_STATUS_LABELS = { active: "Активен", reserve: "Резерв", suspended: "Отстранён", dismissed: "Уволен", deleted: "Удалён" };
const LICENSE_LABELS = { medic: "Медик", pilot: "Пилот", engineer: "Инженер" };
const ACTION_LABELS = {
  create: "добавил",
  update: "изменил",
  delete: "удалил",
  approve: "одобрил",
  reject: "не одобрил",
  appeal: "обжаловал",
  assign: "назначил",
};
const ENTITY_LABELS = {
  reprimand: "Выговор",
  complaint: "Жалоба",
  fighter: "Боец",
  lecture: "Лекция",
  schedule: "Расписание",
};
const LECTURE_TYPE_LABELS = {
  lecture: "Лекция",
  kmb: "КМБ (Курс молодого бойца)",
  standards: "Нормативы",
  exam: "Экзамен",
};
const LECTURE_TYPE_ORDER = ["lecture", "kmb", "standards", "exam"];
const ACCESS_STATUS_LABELS = { active: "Активен", pending: "Ожидает одобрения", blocked: "Заблокирован" };
const REPORT_TITLES = {
  combat_flight: "Боевой вылет",
  base_event: "Событие на базе",
  outside_base_event: "Событие за базой",
  training: "Тренировка",
  attestation: "Аттестация",
  exam: "Экзамен",
  lecture: "Лекция",
  standards: "Нормативы",
  post_patrol_duty: "Пост/патруль/дежурство",
  promotion: "Повышение",
  other: "Прочие",
};
const REPORT_SUBTYPE_LABELS = { post: "Пост", patrol: "Патруль", duty: "Дежурство" };
const REPORT_CONDUCTED_TYPES = new Set(["attestation", "training", "exam", "lecture", "standards"]);
const SPECIALIZATION_TYPE_LABELS = { internal: "внутренняя", external: "внешняя", unique: "уникальная" };
const APPROVAL_LABELS = { review: "на рассмотрении", approved: "одобрено", rejected: "не одобрено" };
const COMPLAINT_STATUS_LABELS = { new: "Новая", in_review: "На рассмотрении", accepted: "Принята", rejected: "Отклонена", closed: "Закрыта" };
const PROMOTION_CATEGORY_LABELS = {
  enlisted: "Рядовой состав",
  nco: "Младший офицерский / сержантский состав",
  officer: "Офицерский состав",
  senior: "Старший офицерский состав",
};
const PROMOTION_CATEGORY_ORDER = ["enlisted", "nco", "officer", "senior"];

const PROFILE_CACHE_KEY = "avk-guard-portal-profile-v1";
const CACHE_TTL_MS = 45_000;

const state = {
  profile: null,
  divisions: [],
  ranks: [],
  fightersCache: [],
  reportFightersCache: [],
  publicRosterRows: [],
  internalRosterRows: [],
  reportsRows: [],
  promotionsRows: [],
  promotionRequirementsRows: [],
  currentPromotionRequirementId: null,
  currentViewedReportId: null,
  currentViewedFighterId: null,
  currentLectureId: null,
  lecturesRows: [],
  cache: new Map(),
  currentReportType: "all",
  pendingRoute: null,
  dictionariesPromise: null,
  authRestoring: false,
};

document.addEventListener("DOMContentLoaded", init);
window.addEventListener("hashchange", routeFromHash);
window.addEventListener("storage", (event) => {
  if (event.key === "avk-guard-portal-auth") restoreSession();
});

async function init() {
  bindUi();
  fillRankSelects(DEFAULT_RANKS);
  toggleLicenseExpiry("create");
  toggleLicenseExpiry("edit");

  state.dictionariesPromise = loadDictionaries();

  const session = await getLocalSession();
  const cachedProfile = session?.user ? readCachedProfile(session.user.id) : null;

  if (cachedProfile?.account_status === "active") {
    state.profile = cachedProfile;
    setAuthenticatedState(cachedProfile);
    setAuthChecking(false);
    routeFromHash();
    restoreSession({ silent: true }).then(() => routeFromHash()).catch(() => {});
    return;
  }

  if (session?.user) {
    state.authRestoring = true;
    setAuthChecking(true);
    routeFromHash();
    restoreSession({ silent: false }).finally(() => {
      state.authRestoring = false;
      setAuthChecking(false);
      routeFromHash();
    });
    return;
  }

  setAuthChecking(false);
  routeFromHash();
}

function bindUi() {
  $("#sideToggle")?.addEventListener("click", () => $("#sideMenu").classList.toggle("hidden"));
  $("#closeSideMenu")?.addEventListener("click", closeSideMenu);
  $$("[data-side-collapse]").forEach((button) => button.addEventListener("click", () => $(`#${button.dataset.sideCollapse}`)?.classList.toggle("hidden")));
  $$("a.route-link").forEach((link) => link.addEventListener("click", closeSideMenu));

  $("#sectionSwitchBtn")?.addEventListener("click", () => {
    if (state.profile) $("#sectionMenu").classList.toggle("hidden");
  });

  $("#loginBtn")?.addEventListener("click", openLogin);
  $("#currentFighterName")?.addEventListener("click", () => {
    if (state.profile) window.location.hash = "#/internal/mePage";
  });
  $("#logoutBtn")?.addEventListener("click", logout);
  $("#submitLoginBtn")?.addEventListener("click", login);
  $("#testConnectionBtn")?.addEventListener("click", testConnection);
  $("#refreshLogsBtn")?.addEventListener("click", loadLogs);
  $("#createLicenseType")?.addEventListener("change", () => toggleLicenseExpiry("create"));
  $("#editLicenseType")?.addEventListener("change", () => toggleLicenseExpiry("edit"));

  $("#refreshPublicRosterBtn")?.addEventListener("click", loadPublicRoster);
  $("#publicRosterDivisionFilter")?.addEventListener("change", loadPublicRoster);
  $("#publicRosterSearch")?.addEventListener("input", renderPublicRoster);
  $("#refreshPublicScheduleBtn")?.addEventListener("click", loadPublicSchedule);

  $("#refreshInternalRosterBtn")?.addEventListener("click", loadInternalRoster);
  $("#internalRosterDivisionFilter")?.addEventListener("change", loadInternalRoster);
  $("#internalRosterSearch")?.addEventListener("input", renderInternalRoster);
  $("#openCreateFighterBtn")?.addEventListener("click", openCreateFighterModal);
  $("#closeCreateFighterModalBtn")?.addEventListener("click", closeCreateFighterModal);
  $("#closeFighterViewBtn")?.addEventListener("click", closeFighterViewModal);
  $("#fighterViewEditBtn")?.addEventListener("click", () => setFighterViewEditMode(true));
  $("#cancelFighterEditBtn")?.addEventListener("click", () => setFighterViewEditMode(false, true));

  $("#closePromotionRequirementModalBtn")?.addEventListener("click", closePromotionRequirementModal);
  $("#cancelPromotionRequirementEditBtn")?.addEventListener("click", closePromotionRequirementModal);
  $("#promotionRequirementForm")?.addEventListener("submit", submitPromotionRequirementEdit);


  $("#lectureSearchInput")?.addEventListener("input", renderLecturesList);
  $("#lectureTypeFilter")?.addEventListener("change", renderLecturesList);
  $("#openLectureCreateBtn")?.addEventListener("click", () => openLectureEditor("create"));
  $("#openLectureEditBtn")?.addEventListener("click", () => openLectureEditor("edit"));
  $("#editCurrentLectureBtn")?.addEventListener("click", () => openLectureEditor("edit", state.currentLectureId));
  $("#closeLectureEditorBtn")?.addEventListener("click", closeLectureEditor);
  $("#cancelLectureEditorBtn")?.addEventListener("click", closeLectureEditor);
  $("#lectureEditorForm")?.addEventListener("submit", submitLecture);
  $("#lectureFileInput")?.addEventListener("change", handleLectureFileUpload);
  $("#insertLectureImageBtn")?.addEventListener("click", insertLectureImage);
  $("#clearLectureFormatBtn")?.addEventListener("click", () => document.execCommand("removeFormat"));
  $$("#lectureToolbar [data-command]").forEach((button) => {
    button.addEventListener("click", () => document.execCommand(button.dataset.command, false, button.dataset.value || null));
  });

  $("#openScheduleModalBtn")?.addEventListener("click", openScheduleModal);
  $("#closeScheduleModalBtn")?.addEventListener("click", () => $("#scheduleModal").classList.add("hidden"));
  $("#scheduleForm")?.addEventListener("submit", submitSchedule);
  $("#refreshInternalScheduleBtn")?.addEventListener("click", loadInternalSchedule);
  $("#internalScheduleScopeFilter")?.addEventListener("change", loadInternalSchedule);
  $("#internalScheduleFrom")?.addEventListener("change", loadInternalSchedule);
  $("#internalScheduleTo")?.addEventListener("change", loadInternalSchedule);

  $("#fighterTypeSelect")?.addEventListener("change", updateFighterTypeView);
  ["rankSelect", "cloneTypeInput", "joinedDayInput", "joinedMonthInput", "trooperNumberInput", "callsignInput", "lastNameInput", "firstNameInput"].forEach((id) => {
    $(`#${id}`)?.addEventListener("input", updatePreview);
    $(`#${id}`)?.addEventListener("change", updatePreview);
  });
  $("#divisionSelect")?.addEventListener("change", () => loadSpecializations("divisionSelect", "specializationSelect"));
  $("#createFighterModal #createFighterForm")?.addEventListener("submit", submitCreateFighter);

  $("#editDivisionSelect")?.addEventListener("change", () => loadSpecializations("editDivisionSelect", "editSpecializationSelect"));
  $("#editFighterForm")?.addEventListener("submit", submitEditFighter);
  $("#reprimandSearch")?.addEventListener("input", loadInternalReprimands);
  $("#complaintSearch")?.addEventListener("input", loadInternalComplaints);
  $("#openComplaintCreateBtn")?.addEventListener("click", openComplaintCreateModal);
  $("#closeComplaintCreateBtn")?.addEventListener("click", closeComplaintCreateModal);
  $("#cancelComplaintCreateBtn")?.addEventListener("click", closeComplaintCreateModal);
  $("#complaintCreateForm")?.addEventListener("submit", submitInternalComplaint);
}

function routeFromHash() {
  const hash = window.location.hash || "#/public/homePage";
  const [, section, target, extra] = hash.split("/");

  if (section === "public") return showPublicPage(target || "homePage");
  if (section === "internal") return showInternalPage(target || "statutePage", extra || null);

  window.location.hash = "#/public/homePage";
}

function showPublicPage(pageId) {
  $("#publicPages").classList.remove("hidden");
  $("#internalPages").classList.add("hidden");
  setSectionLabel("public");
  setNavMode("public");

  $$(".page").forEach((page) => page.classList.remove("active"));
  $(`#${pageId}`)?.classList.add("active");
  setActiveNav(`#/public/${pageId}`);

  if (pageId === "rosterPage") loadPublicRoster();
  if (pageId === "schedulePage") loadPublicSchedule();
  updatePublicAccessCard();
}

function showInternalPage(pageId, extra = null) {
  if (!state.profile) {
    state.pendingRoute = window.location.hash;
    if (state.authRestoring) return;
    openLogin();
    return;
  }

  if (!isAdmin() && pageId === "logsPage") {
    pageId = "statutePage";
    window.location.hash = "#/internal/statutePage";
  }

  if (!isAVK() && ["promotionsPage", "violationsPage"].includes(pageId)) {
    pageId = "statutePage";
    window.location.hash = "#/internal/statutePage";
  }

  if (pageId === "reportsPage") {
    pageId = isAVK() ? "violationsPage" : "statutePage";
    window.location.hash = isAVK() ? "#/internal/violationsPage" : "#/internal/statutePage";
  }

  if (["adminCreateFighterPage", "adminEditFighterPage"].includes(pageId)) {
    pageId = "internalRosterPage";
    window.location.hash = "#/internal/internalRosterPage";
  }

  $("#publicPages").classList.add("hidden");
  $("#internalPages").classList.remove("hidden");
  setSectionLabel("internal");
  setNavMode("internal");

  $$(".internal-page").forEach((page) => page.classList.remove("active"));
  $(`#${pageId}`)?.classList.add("active");
  setActiveNav(`#/internal/${pageId}`);

  if (pageId === "internalHomePage") setActiveNav("#/internal/statutePage");
  if (pageId === "mePage") loadMePage();
  if (pageId === "internalRosterPage") loadInternalRoster();
  if (pageId === "promotionsPage") loadPromotionRequirements();
  if (pageId === "lecturesPage") loadLectures();
  if (pageId === "lectureReaderPage") openLectureReader(extra);
  if (pageId === "adminCreateFighterPage") {
    Promise.resolve(state.dictionariesPromise).then(() => loadSpecializations("divisionSelect", "specializationSelect"));
  }
  if (pageId === "reprimandsPage") loadInternalReprimands();
  if (pageId === "complaintsPage") loadInternalComplaints();
  if (pageId === "internalSchedulePage") loadInternalSchedule();
  if (pageId === "logsPage") loadLogs();
}

function setNavMode(mode) {
  $$(".nav-public").forEach((el) => el.classList.toggle("hidden", mode !== "public"));
  $$(".nav-internal").forEach((el) => el.classList.toggle("hidden", mode !== "internal"));
  updatePermissionVisibility();
  updatePublicAccessCard();
}

function setActiveNav(href) {
  $$(".nav-btn").forEach((link) => link.classList.toggle("active", link.getAttribute("href") === href));
}

function closeSideMenu() {
  $("#sideMenu")?.classList.add("hidden");
}

function openLogin() {
  $("#loginModal").classList.remove("hidden");
  $("#loginStatus").textContent = "";
  $("#loginInput").focus();
}

function closeLogin() {
  $("#loginModal").classList.add("hidden");
}

function setAuthChecking(isChecking) {
  const loginBtn = $("#loginBtn");
  if (!loginBtn) return;

  if (isChecking) {
    loginBtn.textContent = "Проверка входа...";
    loginBtn.disabled = true;
    loginBtn.classList.remove("hidden");
    $("#logoutBtn")?.classList.add("hidden");
    $("#sectionLabel").textContent = "Проверка входа";
    return;
  }

  if (!state.profile) {
    loginBtn.textContent = "Вход в базу";
    loginBtn.disabled = false;
    loginBtn.classList.remove("hidden");
  }
}

async function login() {
  const status = $("#loginStatus");

  try {
    status.textContent = "Выполняется вход...";
    await signInFighter($("#loginInput").value.trim(), $("#passwordInput").value);

    status.textContent = "Загружаю профиль...";
    const profile = await getCurrentFighterProfile();
    if (!profile || profile.account_status !== "active") throw new Error("Аккаунт не активен или не привязан к бойцу.");

    state.profile = profile;
    writeCachedProfile(profile);
    setAuthenticatedState(profile);
    closeLogin();

    const route = state.pendingRoute || "#/internal/reportsPage";
    state.pendingRoute = null;
    window.location.hash = route;
    routeFromHash();
  } catch (error) {
    status.textContent = `Ошибка входа: ${error.message}`;
  }
}

async function logout() {
  await signOutFighter();
  state.profile = null;
  clearProfileCache();
  clearDataCache();

  const loginBtn = $("#loginBtn");
  loginBtn.textContent = "Вход в базу";
  loginBtn.disabled = false;
  loginBtn.classList.remove("hidden");

  $("#logoutBtn").classList.add("hidden");
  $("#sectionChevron").classList.add("hidden");
  $("#currentFighterName").classList.add("hidden");
  $("#currentFighterName").textContent = "";
  $("#internalSideGroup").classList.add("hidden");
  updatePermissionVisibility();
  updatePublicAccessCard();

  window.location.hash = "#/public/homePage";
}

async function restoreSession({ silent = false } = {}) {
  try {
    const profile = await getCurrentFighterProfile();
    if (profile?.account_status === "active") {
      state.profile = profile;
      writeCachedProfile(profile);
      setAuthenticatedState(profile);
    }
  } catch (error) {
    if (!silent) console.warn("Session restore failed:", error.message);
  }
}

function setAuthenticatedState(profile) {
  const fighter = profile.fighters || {};

  const loginBtn = $("#loginBtn");
  loginBtn.textContent = "Вход в базу";
  loginBtn.disabled = false;
  loginBtn.classList.add("hidden");

  $("#logoutBtn").classList.remove("hidden");
  $("#sectionChevron").classList.remove("hidden");
  $("#currentFighterName").textContent = fighter.full_name || "";
  $("#currentFighterName").classList.remove("hidden");
  $("#internalSideGroup").classList.remove("hidden");
  $("#internalRoleBadge").textContent = `${ROLE_LABELS[effectiveSiteRole()] || effectiveSiteRole()} / ${fighter.divisions?.short_name || "без подразделения"}`;

  updatePermissionVisibility();
}

function updatePermissionVisibility() {
  const internalVisible = !$("#internalPages")?.classList.contains("hidden");
  const shouldHideInternalNav = (el) => el.classList.contains("nav-internal") && !internalVisible;

  $$(".nav-officer").forEach((el) => {
    el.classList.toggle("hidden", !isOfficerPlus() || shouldHideInternalNav(el));
  });

  $$(".sergeant-only").forEach((el) => {
    el.classList.toggle("hidden", !isSergeantPlus() || shouldHideInternalNav(el));
  });

  $$(".admin-only").forEach((el) => {
    el.classList.toggle("hidden", !isAdmin() || shouldHideInternalNav(el));
  });

  $$(".owner-only").forEach((el) => {
    el.classList.toggle("hidden", !isOwner() || shouldHideInternalNav(el));
  });

  $$(".avk-only").forEach((el) => {
    el.classList.toggle("hidden", !isAVK() || shouldHideInternalNav(el));
  });
}

function updatePublicAccessCard() {
  const text = $("#publicAccessText");
  const button = $("#publicAccessLoginBtn");
  if (!text || !button) return;

  if (state.profile?.fighters) {
    const fighter = state.profile.fighters;
    text.innerHTML = `<div class="public-auth-box"><strong>Авторизован:</strong> ${escapeHtml(fighter.full_name || "")}<br><strong>Подразделение:</strong> ${escapeHtml(fighter.divisions?.short_name || "—")}</div>`;
    button.classList.add("hidden");
  } else {
    text.textContent = "Внутренний раздел доступен бойцам после входа в базу.";
    button.classList.remove("hidden");
  }
}

function setSectionLabel(section) {
  $("#sectionLabel").textContent = section === "internal" && state.profile
    ? `Внутренний раздел ${currentDivisionShort()}`
    : "Публичный раздел";
}

function effectiveSiteRole() {
  if (state.profile?.admin_role || state.profile?.site_role === "admin") return "admin";
  return state.profile?.site_role || "enlisted";
}

function roleLevel() {
  return ROLE_LEVEL[effectiveSiteRole()] || 0;
}

function currentRankCode() {
  return String(state.profile?.fighters?.rank_code || "").trim().toUpperCase();
}

function rankLevel(rankCode = currentRankCode()) {
  return RANK_LEVEL[String(rankCode || "").trim().toUpperCase()] || 0;
}

function isSergeantRankPlus() {
  return rankLevel() >= RANK_LEVEL[SERGEANT_MIN_RANK];
}

function isOfficerRankPlus() {
  return rankLevel() >= RANK_LEVEL[OFFICER_MIN_RANK];
}

function isSergeantPlus() {
  return roleLevel() >= ROLE_LEVEL.sergeant || isSergeantRankPlus() || isAdmin();
}

function isOfficerPlus() {
  return roleLevel() >= ROLE_LEVEL.officer || isOfficerRankPlus() || isAdmin();
}

function isAdmin() {
  return effectiveSiteRole() === "admin";
}

function isOwner() {
  return state.profile?.auth_user_id === OWNER_USER_ID;
}

function isAVK() {
  return state.profile?.fighters?.divisions?.code === "avk";
}

function currentDivisionId() {
  return state.profile?.fighters?.division_id || null;
}

function currentDivisionShort() {
  return state.profile?.fighters?.divisions?.short_name || "Гвардия";
}

async function testConnection() {
  const status = $("#loginStatus");
  status.textContent = "Проверяю связь с Supabase...";

  try {
    const result = await testSupabaseConnection();
    status.textContent = result.ok ? `Связь есть. Supabase ответил: ${result.status}` : `Связи нет или ошибка. Статус: ${result.status}. ${result.error || ""}`;
  } catch (error) {
    status.textContent = `Ошибка проверки: ${error.message}`;
  }
}

/* Supabase helpers */
const trimLower = (value) => String(value || "").trim().toLowerCase();
const pad = (value, size) => String(value).padStart(size, "0");

function buildAccountLogin({ clone_type = "CS", joined_day, joined_month, trooper_number }) {
  return `${String(clone_type).trim().toUpperCase()}-${pad(joined_day, 3)}/${pad(joined_month, 2)}-${pad(trooper_number, 4)}`;
}

function loginToTechnicalEmail(login) {
  return `${trimLower(login).replaceAll("/", "-").replaceAll(" ", "-")}@${window.AVK_INTERNAL_EMAIL_DOMAIN || "avk.local"}`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isNetworkError(error) {
  const message = trimLower(error?.message || error);
  return ["failed to fetch", "network", "timeout", "aborted", "supabase не отвечает"].some((text) => message.includes(text));
}

function withTimeout(promise, ms, message) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms)),
  ]);
}

async function retryRequest(factory, options = {}) {
  const retries = options.retries ?? 2;
  const timeoutMs = options.timeoutMs ?? 25_000;
  const message = options.message || "Supabase долго не отвечает.";

  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await withTimeout(factory(), timeoutMs, message);
    } catch (error) {
      lastError = error;
      if (!isNetworkError(error) || attempt === retries) break;
      await sleep(900 * (attempt + 1));
    }
  }
  throw lastError;
}

async function signInFighter(login, password) {
  const email = loginToTechnicalEmail(login);
  const { data, error } = await retryRequest(
    () => window.avkSupabase.auth.signInWithPassword({ email, password }),
    { retries: 2, timeoutMs: 25_000, message: "Supabase не отвечает 25 секунд." }
  );
  if (error) throw error;
  return data.user;
}

async function signOutFighter() {
  await window.avkSupabase.auth.signOut();
}

async function getLocalSession() {
  const { data } = await window.avkSupabase.auth.getSession();
  return data?.session || null;
}

async function getCurrentUser() {
  const session = await getLocalSession();
  return session?.user || null;
}

function readCachedProfile(userId) {
  try {
    const raw = localStorage.getItem(PROFILE_CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (!cached?.profile || cached.userId !== userId) return null;
    if (Date.now() - Number(cached.savedAt || 0) > 1000 * 60 * 60 * 24 * 14) return null;
    return cached.profile;
  } catch {
    return null;
  }
}

function writeCachedProfile(profile) {
  try {
    localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify({
      userId: profile?.auth_user_id || null,
      savedAt: Date.now(),
      profile,
    }));
  } catch {}
}

function clearProfileCache() {
  try { localStorage.removeItem(PROFILE_CACHE_KEY); } catch {}
}

async function getCurrentFighterProfile() {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data, error } = await retryRequest(
    () => window.avkSupabase
      .from("fighter_access")
      .select(`
        site_role,
        admin_role,
        account_status,
        auth_user_id,
        fighters (
          id,
          fighter_type,
          clone_type,
          joined_day,
          joined_month,
          joined_year,
          trooper_number,
          account_login,
          full_name,
          callsign,
          rank_code,
          division_id,
          specialization_id,
          divisions (id, name, short_name, code),
          specializations (id, name, code),
          fighter_licenses (id, license_type, expires_on)
        )
      `)
      .eq("auth_user_id", user.id)
      .single(),
    { retries: 1, timeoutMs: 8_000, message: "Профиль загружается дольше обычного." }
  );
  if (error) throw error;
  return data;
}

async function testSupabaseConnection() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10_000);
  const url = `${window.AVK_SUPABASE_URL}/auth/v1/settings`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { apikey: window.AVK_SUPABASE_ANON_KEY },
      signal: controller.signal,
    });
    return { ok: response.ok, status: response.status, url };
  } catch (error) {
    return { ok: false, status: "network_error", url, error: error.message };
  } finally {
    clearTimeout(timeoutId);
  }
}

function readJsonCache(key) {
  try {
    const raw = localStorage.getItem(`avk-cache:${key}`);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (Date.now() > Number(cached.expiresAt || 0)) return null;
    return cached.value;
  } catch { return null; }
}

function writeJsonCache(key, value, ttlMs = CACHE_TTL_MS) {
  try {
    localStorage.setItem(`avk-cache:${key}`, JSON.stringify({ value, expiresAt: Date.now() + ttlMs }));
  } catch {}
}

async function cachedRequest(key, loader, ttlMs = CACHE_TTL_MS) {
  const cached = state.cache.get(key);
  if (cached && Date.now() < cached.expiresAt) return cached.value;

  const value = await loader();
  state.cache.set(key, { value, expiresAt: Date.now() + ttlMs });
  return value;
}

function clearDataCache(prefix = "") {
  for (const key of state.cache.keys()) {
    if (!prefix || key.startsWith(prefix)) state.cache.delete(key);
  }
}

async function loadDictionaries() {
  const cached = readJsonCache("dictionaries:v2");
  if (cached?.divisions?.length) {
    state.divisions = cached.divisions;
    fillDivisionSelects(state.divisions);
  }
  if (cached?.ranks?.length) {
    state.ranks = cached.ranks;
    fillRankSelects(state.ranks);
  } else {
    state.ranks = DEFAULT_RANKS;
    fillRankSelects(DEFAULT_RANKS);
  }

  try {
    const ranks = await getRanks();
    state.ranks = ranks?.length ? ranks : DEFAULT_RANKS;
    fillRankSelects(state.ranks);
  } catch (error) {
    console.warn("Ranks dictionary failed:", error.message);
    state.ranks = DEFAULT_RANKS;
    fillRankSelects(DEFAULT_RANKS);
  }

  try {
    const divisions = await getDivisions();
    state.divisions = divisions;
    fillDivisionSelects(divisions);
    writeJsonCache("dictionaries:v2", { divisions, ranks: state.ranks }, 1000 * 60 * 60 * 24 * 7);
  } catch (error) {
    console.warn("Divisions dictionary failed:", error.message);
  }
}

async function getRanks() {
  try {
    const { data, error } = await window.avkSupabase
      .from("ranks")
      .select("code, name, sort_order")
      .order("sort_order");

    if (error) throw error;
    return data?.length ? data : DEFAULT_RANKS;
  } catch (error) {
    console.warn("Ranks load failed, fallback ranks used:", error.message);
    return DEFAULT_RANKS;
  }
}

async function getDivisions() {
  const { data, error } = await window.avkSupabase.from("divisions").select("id, name, short_name, code, display_order").eq("is_active", true).order("display_order");
  if (error) throw error;
  return data || [];
}

function fillDivisionSelects(divisions) {
  const allOptions = `<option value="all">Все подразделения</option>${divisions.map(divisionOption).join("")}`;
  const options = divisions.map(divisionOption).join("");

  ["publicRosterDivisionFilter", "internalRosterDivisionFilter"].forEach((id) => {
    const select = $(`#${id}`);
    if (select) select.innerHTML = allOptions;
  });

  ["divisionSelect", "editDivisionSelect", "scheduleDivisionInput", "patchDivisionInput"].forEach((id) => {
    const select = $(`#${id}`);
    if (select) select.innerHTML = options;
  });

  const avk = divisions.find((division) => division.code === "avk");
  if (avk) {
    ["divisionSelect", "editDivisionSelect", "scheduleDivisionInput", "patchDivisionInput"].forEach((id) => {
      const select = $(`#${id}`);
      if (select) select.value = avk.id;
    });
  }
}

function divisionOption(division) {
  return `<option value="${escapeHtml(division.id)}">${escapeHtml(division.short_name || division.name)}</option>`;
}

function fillRankSelects(ranks) {
  const source = ranks?.length ? ranks : DEFAULT_RANKS;
  const options = source.map((rank) => {
    const code = escapeHtml(rank.code);
    const name = escapeHtml(rank.name || rank.code);
    return `<option value="${code}">${code} — ${name}</option>`;
  }).join("");

  ["rankSelect", "editRankSelect"].forEach((id) => {
    const select = $(`#${id}`);
    if (!select) return;

    const previous = select.value;
    select.innerHTML = options;

    if (previous && source.some((rank) => rank.code === previous)) {
      select.value = previous;
    }
  });

  const createRankSelect = $("#rankSelect");
  if (createRankSelect && !createRankSelect.value) createRankSelect.value = "LCPL";
  updatePreview();
}

function fillReportTypeSelects() {
  const withAll = `<option value="all">Все типы</option>${Object.entries(REPORT_TITLES).map(([code, title]) => `<option value="${code}">${title}</option>`).join("")}`;
  const onlyTypes = Object.entries(REPORT_TITLES).map(([code, title]) => `<option value="${code}">${title}</option>`).join("");
  const subtypes = `<option value="all">Все подтипы</option>${Object.entries(REPORT_SUBTYPE_LABELS).map(([code, title]) => `<option value="${code}">${title}</option>`).join("")}`;
  const subtypesOnly = Object.entries(REPORT_SUBTYPE_LABELS).map(([code, title]) => `<option value="${code}">${title}</option>`).join("");

}

async function loadSpecializations(divisionSelectId, specSelectId) {
  const divisionId = $(`#${divisionSelectId}`)?.value;
  const select = $(`#${specSelectId}`);
  if (!divisionId || !select) return;

  try {
    const rows = await getDivisionSpecializations(divisionId);
    select.innerHTML = rows.map((row) => {
      const typeLabel = SPECIALIZATION_TYPE_LABELS[row.specialization_type] || row.specialization_type;
      return `<option value="${row.specializations.id}">${escapeHtml(row.specializations.name)} (${escapeHtml(typeLabel)})</option>`;
    }).join("");
  } catch (error) {
    select.innerHTML = "";
    console.warn("Specializations load failed:", error.message);
  }
}

async function getDivisionSpecializations(divisionId) {
  if (!divisionId) return [];
  const { data, error } = await window.avkSupabase
    .from("division_specializations")
    .select("specialization_type, specializations (id, name, code)")
    .eq("division_id", divisionId)
    .order("specialization_type");
  if (error) throw error;
  return data || [];
}

function searchQuery(id) {
  return ($("#" + id)?.value || "").trim().toLowerCase();
}

function matchesQuery(fields, query) {
  if (!query) return true;
  return fields.filter(Boolean).join(" ").toLowerCase().includes(query);
}

function filterRosterRows(rows, query) {
  return rows.filter((row) => matchesQuery([
    row.full_name,
    row.account_login,
    row.callsign,
    row.rank_code,
    row.divisions?.name,
    row.divisions?.short_name,
    row.specializations?.name,
    row.specializations?.code,
  ], query));
}

function setupSingleFighterPicker(inputSelector, optionsSelector, onPick = null) {
  const input = $(inputSelector);
  const options = $(optionsSelector);
  if (!input || !options) return;

  const render = () => {
    const query = input.value.trim().toLowerCase();
    const matches = state.reportFightersCache
      .filter((fighter) => matchesQuery([
        fighter.full_name,
        fighter.account_login,
        fighter.callsign,
        fighter.rank_code,
        fighter.divisions?.short_name,
        fighter.specializations?.name,
      ], query))
      .slice(0, 10);

    options.innerHTML = matches.length ? matches.map((fighter) => `
      <div class="fighter-option" data-value="${escapeHtml(fighter.full_name || fighter.account_login || "")}">
        ${escapeHtml(fighter.full_name || fighter.account_login || "")}
        <small>${escapeHtml(fighter.divisions?.short_name || "—")} · ${escapeHtml(fighter.specializations?.name || "без специализации")}</small>
      </div>
    `).join("") : `<div class="fighter-option" data-value="${escapeHtml(input.value)}">Оставить вручную: ${escapeHtml(input.value || "пусто")}</div>`;

    options.classList.remove("hidden");
  };

  input.oninput = render;
  input.onfocus = render;
  options.onmousedown = (event) => {
    const option = event.target.closest(".fighter-option");
    if (!option) return;
    input.value = option.dataset.value || "";
    options.classList.add("hidden");
    if (onPick) onPick(input.value);
  };
}

function renderFightersDatalist(rows) {
  const datalist = $("#fightersDatalist");
  if (!datalist) return;
  datalist.innerHTML = rows.map((row) => {
    const value = escapeHtml(row.full_name || row.account_login || "");
    return `<option value="${value}"></option>`;
  }).join("");
}

async function getFighters(divisionId = "all") {
  const cacheKey = `fighters:${divisionId}`;
  return cachedRequest(cacheKey, async () => {
    let query = window.avkSupabase
    .from("fighters")
    .select(`
      id,
      fighter_type,
      clone_type,
      joined_day,
      joined_month,
      joined_year,
      trooper_number,
      account_login,
      full_name,
      callsign,
      rank_code,
      status,
      division_id,
      specialization_id,
      divisions (id, name, short_name, code),
      specializations (id, name, code),
      fighter_licenses (id, license_type, expires_on)
    `)
    .neq("status", "deleted")
    .order("created_at", { ascending: false });

  if (divisionId !== "all") query = query.eq("division_id", divisionId);
  query = query.limit(250);

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
  }, 60_000);
}

async function getFightersForEdit(divisionId = "all") {
  let query = window.avkSupabase
    .from("fighters")
    .select(`
      id,
      fighter_type,
      clone_type,
      joined_day,
      joined_month,
      joined_year,
      trooper_number,
      account_login,
      full_name,
      callsign,
      rank_code,
      status,
      division_id,
      specialization_id,
      divisions (id, name, short_name, code),
      specializations (id, name, code),
      fighter_licenses (id, license_type, expires_on),
      fighter_access (site_role, account_status, admin_role)
    `)
    .neq("status", "deleted")
    .order("created_at", { ascending: false });

  if (divisionId !== "all") query = query.eq("division_id", divisionId);
  query = query.limit(250);

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

/* Public pages */
async function loadPublicRoster() {
  const tbody = $("#publicRosterTableBody");
  tbody.innerHTML = loadingRow(8);
  try {
    state.publicRosterRows = await getFighters($("#publicRosterDivisionFilter").value || "all");
    renderPublicRoster();
  } catch (error) {
    tbody.innerHTML = errorRow(8, error);
  }
}

function renderPublicRoster() {
  const tbody = $("#publicRosterTableBody");
  if (!tbody) return;
  const filtered = filterRosterRows(state.publicRosterRows || [], searchQuery("publicRosterSearch"));
  tbody.innerHTML = filtered.length ? filtered.map(rosterRow).join("") : emptyRow(8, "Нет данных.");
}

async function loadPublicSchedule() {
  const tbody = $("#publicScheduleTableBody");
  tbody.innerHTML = loadingRow(6);
  try {
    const rows = await getSchedules({ publicOnly: true, availableOnly: false, scope: "available", from: $("#publicScheduleFrom").value, to: $("#publicScheduleTo").value });
    tbody.innerHTML = rows.length ? rows.map(scheduleRow).join("") : emptyRow(6, "Нет записей.");
  } catch (error) {
    tbody.innerHTML = errorRow(6, error);
  }
}

/* Internal roster */
async function loadInternalRoster() {
  const tbody = $("#internalRosterTableBody");
  tbody.innerHTML = loadingRow(7);

  const filterWrap = $("#internalRosterFilterWrap");
  const filter = $("#internalRosterDivisionFilter");

  if (isAVK()) {
    filterWrap.classList.remove("hidden");
  } else {
    filterWrap.classList.add("hidden");
    filter.value = currentDivisionId();
  }

  try {
    const divisionId = isAVK() ? (filter.value || "all") : currentDivisionId();
    state.internalRosterRows = await getFighters(divisionId || "all");
    renderInternalRoster();
    $("#rosterAccessBadge").textContent = isSergeantPlus() ? "редактирование с сержантского состава" : "только просмотр";
  } catch (error) {
    tbody.innerHTML = errorRow(7, error);
  }
}

function renderInternalRoster() {
  const tbody = $("#internalRosterTableBody");
  if (!tbody) return;
  const filtered = filterRosterRows(state.internalRosterRows || [], searchQuery("internalRosterSearch"));
  tbody.innerHTML = filtered.length ? filtered.map(rosterRow).join("") : emptyRow(8, "Нет данных.");
}

function isLicenseActive(expiresOn) {
  if (!expiresOn) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expires = new Date(`${expiresOn}T23:59:59`);
  return expires >= today;
}

function formatDateShort(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" });
}

function renderLicenses(row) {
  const licenses = row.fighter_licenses || [];
  if (!licenses.length) return `<span class="license-pill license-none">Нет лицензий</span>`;

  return `<div class="license-list">${licenses.map((license) => {
    const active = isLicenseActive(license.expires_on);
    const label = LICENSE_LABELS[license.license_type] || license.license_type;
    return `<span class="license-pill ${active ? "license-active" : "license-expired"}">${active ? "✓" : "!"} ${escapeHtml(label)} — до ${escapeHtml(formatDateShort(license.expires_on))} · ${active ? "Активна" : "Не активна"}</span>`;
  }).join("")}</div>`;
}

function rosterRow(row) {
  return `<tr>
    <td>${escapeHtml(row.full_name || row.account_login)}</td>
    <td>${escapeHtml(row.fighter_type || "")}</td>
    <td>${escapeHtml(row.divisions?.short_name || "—")}</td>
    <td>${escapeHtml(row.specializations?.name || "—")}</td>
    <td>${escapeHtml(row.rank_code || "")}</td>
    <td>${renderLicenses(row)}</td>
    <td><span class="badge ${row.status === "active" ? "green" : "gray"}">${escapeHtml(FIGHTER_STATUS_LABELS[row.status] || row.status)}</span></td>
    <td><button class="secondary-btn small-btn roster-view-btn" onclick="openFighterViewModal('${row.id}')" type="button" title="Просмотр">🔍</button></td>
  </tr>`;
}

/* Lectures */
async function loadLectures() {
  const box = $("#lecturesList");
  box.innerHTML = `<div class="placeholder-box">Загрузка...</div>`;
  try {
    const { data, error } = await window.avkSupabase
      .from("internal_documents")
      .select("id, title, content, lecture_type, source_url, source_type, created_at, updated_at")
      .eq("category", "lectures")
      .order("updated_at", { ascending: false });
    if (error) throw error;

    state.lecturesRows = data || [];
    renderLecturesList();
  } catch (error) {
    box.innerHTML = `<div class="placeholder-box">Ошибка: ${escapeHtml(error.message)}</div>`;
  }
}

function renderLecturesList() {
  const box = $("#lecturesList");
  if (!box) return;

  const query = ($("#lectureSearchInput")?.value || "").trim().toLowerCase();
  const typeFilter = $("#lectureTypeFilter")?.value || "all";

  let rows = (state.lecturesRows || []).filter((lecture) => {
    const matchesTitle = !query || String(lecture.title || "").toLowerCase().includes(query);
    const lectureType = lecture.lecture_type || "lecture";
    const matchesType = typeFilter === "all" || lectureType === typeFilter;
    return matchesTitle && matchesType;
  });

  if (!rows.length) {
    box.innerHTML = `<div class="placeholder-box">Лекций пока нет.</div>`;
    return;
  }

  if (typeFilter !== "all") {
    box.innerHTML = renderLectureCards(rows);
    $$("a.route-link", box).forEach((link) => link.addEventListener("click", closeSideMenu));
    return;
  }

  box.innerHTML = LECTURE_TYPE_ORDER.map((type) => {
    const groupRows = rows.filter((lecture) => (lecture.lecture_type || "lecture") === type);
    if (!groupRows.length) return "";
    return `
      <section class="lecture-type-group">
        <h3 class="lecture-type-title">${escapeHtml(LECTURE_TYPE_LABELS[type] || type)}</h3>
        <div class="lecture-card-grid">${renderLectureCards(groupRows)}</div>
      </section>
    `;
  }).join("");

  $$("a.route-link", box).forEach((link) => link.addEventListener("click", closeSideMenu));
}

function renderLectureCards(rows) {
  return rows.map((lecture) => `
    <a class="lecture-card route-link" href="#/internal/lectureReaderPage/${lecture.id}">
      <h3 class="lecture-card-title">${escapeHtml(lecture.title)}</h3>
      <div class="lecture-card-meta">
        ${escapeHtml(LECTURE_TYPE_LABELS[lecture.lecture_type || "lecture"] || "Лекция")} ·
        Обновлено: ${escapeHtml(formatDateTime(lecture.updated_at || lecture.created_at))}
      </div>
    </a>
  `).join("");
}

async function openLectureReader(lectureId) {
  if (!lectureId) {
    $("#lectureReaderTitle").textContent = "Лекция";
    $("#lectureReaderContent").innerHTML = `<div class="placeholder-box">Лекция не выбрана.</div>`;
    return;
  }

  state.currentLectureId = lectureId;

  let lecture = (state.lecturesRows || []).find((item) => item.id === lectureId);
  if (!lecture) {
    try {
      const { data, error } = await window.avkSupabase
        .from("internal_documents")
        .select("id, title, content, lecture_type, source_url, source_type, created_at, updated_at")
        .eq("id", lectureId)
        .single();
      if (error) throw error;
      lecture = data;
    } catch (error) {
      $("#lectureReaderTitle").textContent = "Ошибка";
      $("#lectureReaderContent").innerHTML = `<div class="placeholder-box">Ошибка: ${escapeHtml(error.message)}</div>`;
      return;
    }
  }

  $("#lectureReaderTitle").textContent = lecture.title || "Лекция";
  $("#lectureReaderMeta").textContent = `${LECTURE_TYPE_LABELS[lecture.lecture_type || "lecture"] || "Лекция"} · Обновлено: ${formatDateTime(lecture.updated_at || lecture.created_at)}`;
  $("#lectureReaderContent").innerHTML = sanitizeLectureHtml(lecture.content || "<p>Текст лекции пуст.</p>");
}

function openLectureEditor(mode = "create", lectureId = null) {
  if (!isOfficerPlus()) return;

  const isEdit = mode === "edit";
  const id = lectureId || state.currentLectureId;
  const lecture = isEdit ? (state.lecturesRows || []).find((item) => item.id === id) : null;

  if (isEdit && !lecture) {
    alert("Сначала открой лекцию или выбери её из списка.");
    return;
  }

  state.currentLectureId = isEdit ? lecture.id : null;
  $("#lectureEditorTitle").textContent = isEdit ? "Редактировать лекцию" : "Создать лекцию";
  $("#lectureTitleInput").value = lecture?.title || "";
  $("#lectureTypeInput").value = lecture?.lecture_type || "lecture";
  $("#lectureSourceUrlInput").value = lecture?.source_url || "";
  $("#lectureContentEditor").innerHTML = sanitizeLectureHtml(lecture?.content || "");
  $("#lectureContentInput").value = lecture?.content || "";
  $("#lectureEditorStatus").textContent = "";
  $("#lectureFileInput").value = "";

  $("#lectureEditorModal").classList.remove("hidden");
  $("#lectureEditorModal").scrollTop = 0;
  $(".lecture-editor-modal", $("#lectureEditorModal"))?.scrollTo?.({ top: 0, behavior: "instant" });
}

function closeLectureEditor() {
  $("#lectureEditorModal").classList.add("hidden");
}

async function submitLecture(event) {
  event.preventDefault();

  if (!isOfficerPlus()) {
    $("#lectureEditorStatus").textContent = "Создавать и редактировать лекции могут только офицеры и администраторы.";
    return;
  }

  const status = $("#lectureEditorStatus");
  const title = $("#lectureTitleInput").value.trim();
  const content = $("#lectureContentEditor").innerHTML.trim();
  const sourceUrl = $("#lectureSourceUrlInput").value.trim() || null;

  if (!title) {
    status.textContent = "Укажи название лекции.";
    return;
  }

  try {
    status.textContent = "Сохранение...";

    const payload = {
      title,
      lecture_type: $("#lectureTypeInput").value || "lecture",
      content,
      source_url: sourceUrl,
      source_type: sourceUrl ? "google_docs_or_link" : "editor",
      category: "lectures",
      visibility: "internal",
      updated_at: new Date().toISOString(),
    };

    let error;
    if (state.currentLectureId) {
      ({ error } = await window.avkSupabase
        .from("internal_documents")
        .update(payload)
        .eq("id", state.currentLectureId));
      if (!error) await logAction("update", "lecture", state.currentLectureId, { title });
    } else {
      const result = await window.avkSupabase
        .from("internal_documents")
        .insert(payload)
        .select("id")
        .single();
      error = result.error;
      if (!error) {
        state.currentLectureId = result.data.id;
        await logAction("create", "lecture", state.currentLectureId, { title });
      }
    }

    if (error) throw error;

    status.textContent = "Сохранено.";
    closeLectureEditor();
    await loadLectures();

    if (state.currentLectureId) {
      window.location.hash = `#/internal/lectureReaderPage/${state.currentLectureId}`;
      await openLectureReader(state.currentLectureId);
    }
  } catch (error) {
    status.textContent = `Ошибка: ${error.message}`;
  }
}

async function handleLectureFileUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const status = $("#lectureEditorStatus");
  status.textContent = "Читаю файл...";

  try {
    const ext = file.name.split(".").pop().toLowerCase();
    let html = "";

    if (["txt", "md"].includes(ext)) {
      const text = await file.text();
      html = textToHtml(text);
    } else if (ext === "html") {
      html = await file.text();
    } else if (["png", "jpg", "jpeg", "webp"].includes(ext)) {
      html = await imageFileToHtml(file);
    } else if (ext === "docx") {
      html = await readDocxAsHtml(file);
    } else if (ext === "pdf") {
      html = await readPdfAsHtml(file);
    } else {
      throw new Error("Этот формат пока не поддерживается. Можно вставить текст вручную.");
    }

    $("#lectureContentEditor").innerHTML = sanitizeLectureHtml(html);
    if (!$("#lectureTitleInput").value.trim()) {
      $("#lectureTitleInput").value = file.name.replace(/\.[^.]+$/, "");
    }
    status.textContent = "Файл загружен в редактор.";
  } catch (error) {
    status.textContent = `Ошибка импорта: ${error.message}`;
  }
}

function textToHtml(text) {
  return String(text || "")
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function imageFileToHtml(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(`<p><img src="${reader.result}" alt="${escapeHtml(file.name)}"></p>`);
    reader.onerror = () => reject(new Error("Не удалось прочитать картинку."));
    reader.readAsDataURL(file);
  });
}

async function readDocxAsHtml(file) {
  await ensureScript("https://cdn.jsdelivr.net/npm/mammoth@1.8.0/mammoth.browser.min.js", "mammoth");
  const arrayBuffer = await file.arrayBuffer();
  const result = await window.mammoth.convertToHtml({ arrayBuffer });
  return result.value || "<p>DOCX прочитан, но текст не найден.</p>";
}

async function readPdfAsHtml(file) {
  await ensureScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js", "pdfjsLib");
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const chunks = [];

  for (let pageNo = 1; pageNo <= pdf.numPages; pageNo += 1) {
    const page = await pdf.getPage(pageNo);
    const content = await page.getTextContent();
    const text = content.items.map((item) => item.str).join(" ").trim();
    if (text) chunks.push(`<h3>Страница ${pageNo}</h3><p>${escapeHtml(text)}</p>`);
  }

  return chunks.join("") || "<p>PDF прочитан, но текст не найден.</p>";
}

function ensureScript(src, globalName) {
  return new Promise((resolve, reject) => {
    if (window[globalName]) return resolve();

    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Не удалось загрузить библиотеку: ${src}`));
    document.head.appendChild(script);
  });
}

function insertLectureImage() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;
    const html = await imageFileToHtml(file);
    document.execCommand("insertHTML", false, html);
  };
  input.click();
}

function sanitizeLectureHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = String(html || "");

  template.content.querySelectorAll("script, iframe, object, embed").forEach((node) => node.remove());
  template.content.querySelectorAll("*").forEach((node) => {
    [...node.attributes].forEach((attr) => {
      const name = attr.name.toLowerCase();
      const value = attr.value || "";
      if (name.startsWith("on")) node.removeAttribute(attr.name);
      if (["href", "src"].includes(name) && /^javascript:/i.test(value)) node.removeAttribute(attr.name);
    });
  });

  return template.innerHTML;
}

/* Reprimands */
async function loadInternalReprimands() {
  const tbody = $("#internalReprimandsTableBody");
  tbody.innerHTML = loadingRow(6);
  try {
    let query = window.avkSupabase
      .from("reprimands")
      .select(`
        id,
        fighter_id,
        division_id,
        reason,
        issued_by,
        issued_at,
        status,
        fighters (id, full_name, account_login, callsign),
        divisions (id, name, short_name, code)
      `)
      .order("issued_at", { ascending: false });

    if (!isAVK() && currentDivisionId()) query = query.eq("division_id", currentDivisionId());

    const { data, error } = await query;
    if (error) throw error;
    const queryText = searchQuery("reprimandSearch");
    const rows = (data || []).filter((row) => matchesQuery([
      row.fighters?.full_name,
      row.fighters?.account_login,
      row.fighters?.callsign,
    ], queryText));
    tbody.innerHTML = rows.length ? rows.map(reprimandRow).join("") : emptyRow(6, "Выговоров нет.");
  } catch (error) {
    tbody.innerHTML = errorRow(6, error);
  }
}

function reprimandRow(row) {
  const canAppeal = isOfficerPlus() || row.fighter_id === state.profile?.fighters?.id;
  const appeal = canAppeal ? `<button class="secondary-btn small-btn" onclick="appealReprimand('${row.id}')" type="button">Обжаловать</button>` : "";
  const del = isAdmin() ? `<button class="secondary-btn small-btn" onclick="deleteReprimand('${row.id}')" type="button">Удалить</button>` : "";
  const actions = [appeal, del].filter(Boolean).join(" ") || "—";

  return `<tr>
    <td>${escapeHtml(row.fighters?.full_name || row.fighters?.account_login || "")}</td>
    <td>${escapeHtml(row.divisions?.short_name || "")}</td>
    <td>${escapeHtml(row.reason || "")}</td>
    <td>${escapeHtml(row.issued_at || "")}</td>
    <td><span class="badge ${row.status === "active" ? "red" : "gray"}">${escapeHtml(row.status || "")}</span></td>
    <td>${actions}</td>
  </tr>`;
}

async function deleteReprimand(id) {
  if (!isAdmin() || !confirm("Удалить выговор?")) return;
  try {
    const { error } = await window.avkSupabase.from("reprimands").delete().eq("id", id);
    if (error) throw error;
    await logAction("delete", "reprimand", id, {});
    await loadInternalReprimands();
  } catch (error) {
    alert(`Ошибка: ${error.message}`);
  }
}

async function appealReprimand(id) {
  try {
    const { error } = await window.avkSupabase.from("reprimands").update({ status: "appealed" }).eq("id", id);
    if (error) throw error;
    await logAction("appeal", "reprimand", id, {});
    await loadInternalReprimands();
  } catch (error) {
    alert(`Ошибка: ${error.message}`);
  }
}

/* Complaints */
async function loadInternalComplaints() {
  const tbody = $("#internalComplaintsTableBody");
  tbody.innerHTML = loadingRow(8);
  try {
    let query = window.avkSupabase
      .from("complaints")
      .select(`
        id,
        complainant_name,
        complainant_steam_id,
        target_name,
        target_steam_id,
        target_fighter_id,
        complaint_type,
        description,
        status,
        assigned_to_id,
        created_at,
        target_fighter:fighters!complaints_target_fighter_id_fkey (id, full_name, account_login, callsign, division_id),
        assigned_to:fighters!complaints_assigned_to_id_fkey (id, full_name)
      `)
      .order("created_at", { ascending: false });

    const { data, error } = await query;
    if (error) throw error;

    let rows = data || [];
    if (!isAVK()) {
      const myDivision = currentDivisionId();
      const myId = state.profile?.fighters?.id;
      rows = rows.filter((row) => {
        if (isOfficerPlus() && row.target_fighter?.division_id === myDivision) return true;
        if (row.target_fighter_id === myId) return true;
        return false;
      });
    }

    const queryText = searchQuery("complaintSearch");
    rows = rows.filter((row) => matchesQuery([
      row.target_fighter?.full_name,
      row.target_fighter?.account_login,
      row.target_fighter?.callsign,
      row.target_name,
      row.complainant_name,
    ], queryText));

    tbody.innerHTML = rows.length ? rows.map(complaintRow).join("") : emptyRow(8, "Жалоб нет.");
  } catch (error) {
    tbody.innerHTML = errorRow(8, error);
  }
}

function complaintRow(row) {
  const canProcess = isSergeantPlus();
  const canAssign = isOfficerPlus();
  const actions = [
    canAssign ? `<button class="secondary-btn small-btn" onclick="assignComplaintToMe('${row.id}')" type="button">На себя</button>` : "",
    canProcess ? `<button class="secondary-btn small-btn" onclick="setComplaintStatus('${row.id}','accepted')" type="button">Принять</button>` : "",
    canProcess ? `<button class="secondary-btn small-btn" onclick="setComplaintStatus('${row.id}','rejected')" type="button">Отклонить</button>` : "",
    isAdmin() ? `<button class="secondary-btn small-btn" onclick="deleteComplaint('${row.id}')" type="button">Удалить</button>` : "",
  ].filter(Boolean).join("");

  return `<tr>
    <td>${formatDateTime(row.created_at)}</td>
    <td>${escapeHtml(row.complainant_name || "")}</td>
    <td>${escapeHtml(row.target_fighter?.full_name || row.target_name || "")}</td>
    <td>${escapeHtml(row.complaint_type || "")}</td>
    <td>${escapeHtml(row.description || "")}</td>
    <td><span class="badge gray">${escapeHtml(COMPLAINT_STATUS_LABELS[row.status] || row.status || "")}</span></td>
    <td>${escapeHtml(row.assigned_to?.full_name || "—")}</td>
    <td><div class="action-row">${actions || "—"}</div></td>
  </tr>`;
}

async function assignComplaintToMe(id) {
  try {
    const { error } = await window.avkSupabase
      .from("complaints")
      .update({ assigned_to_id: state.profile.fighters.id, status: "in_review" })
      .eq("id", id);
    if (error) throw error;
    await logAction("assign", "complaint", id, { assigned_to: state.profile.fighters.full_name });
    await loadInternalComplaints();
  } catch (error) {
    alert(`Ошибка: ${error.message}`);
  }
}

async function setComplaintStatus(id, status) {
  try {
    const { error } = await window.avkSupabase
      .from("complaints")
      .update({ status, processed_by: state.profile.fighters.id, processed_at: new Date().toISOString() })
      .eq("id", id);
    if (error) throw error;
    await logAction(status === "rejected" ? "reject" : "update", "complaint", id, { status });
    await loadInternalComplaints();
  } catch (error) {
    alert(`Ошибка: ${error.message}`);
  }
}

async function deleteComplaint(id) {
  if (!isAdmin() || !confirm("Удалить жалобу?")) return;
  try {
    const { error } = await window.avkSupabase.from("complaints").delete().eq("id", id);
    if (error) throw error;
    await logAction("delete", "complaint", id, {});
    await loadInternalComplaints();
  } catch (error) {
    alert(`Ошибка: ${error.message}`);
  }
}


async function openComplaintCreateModal() {
  if (!isAVK()) return;

  $("#complaintCreateStatus").textContent = "";
  $("#complaintCreateForm").reset();

  try {
    await ensureReportFightersCache();
  } catch (error) {
    console.warn("Could not preload fighters for complaint:", error.message);
  }

  $("#complaintCreateModal").classList.remove("hidden");
  $("#complaintCreateModal").scrollTop = 0;
}

function closeComplaintCreateModal() {
  $("#complaintCreateModal").classList.add("hidden");
}

async function submitInternalComplaint(event) {
  event.preventDefault();

  if (!isAVK()) {
    $("#complaintCreateStatus").textContent = "Создавать жалобы из этого раздела может только Гвардия.";
    return;
  }

  const status = $("#complaintCreateStatus");
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const targetText = String(data.target_name || "").trim();

  const target = (state.reportFightersCache || []).find((fighter) => {
    return [fighter.full_name, fighter.account_login, fighter.callsign]
      .filter(Boolean)
      .some((value) => String(value).trim().toLowerCase() === targetText.toLowerCase());
  });

  try {
    status.textContent = "Создание жалобы...";

    const payload = {
      complainant_name: state.profile?.fighters?.full_name || "Гвардия",
      complainant_steam_id: "internal-avk",
      target_name: target?.full_name || targetText,
      target_steam_id: null,
      target_fighter_id: target?.id || null,
      complaint_type: data.complaint_type,
      evidence_type: data.evidence_type || "personal",
      evidence_link: data.evidence_link || null,
      evidence_note: "Жалоба создана во внутреннем разделе Гвардии.",
      description: data.description,
      status: "new",
    };

    const { error } = await window.avkSupabase.from("complaints").insert(payload);
    if (error) throw error;

    await logAction("create", "complaint", null, { target: payload.target_name, type: payload.complaint_type });
    status.textContent = "Жалоба создана.";
    closeComplaintCreateModal();
    await loadInternalComplaints();
  } catch (error) {
    status.textContent = `Ошибка: ${error.message}`;
  }
}

/* Schedule */
async function getSchedules({ publicOnly = false, availableOnly = true, scope = "available", from = "", to = "" } = {}) {
  let query = window.avkSupabase
    .from("schedules")
    .select(`
      id,
      title,
      description,
      division_id,
      schedule_scope,
      starts_at,
      ends_at,
      event_date,
      event_time,
      public_visible,
      divisions (id, name, short_name, code)
    `)
    .order("starts_at", { ascending: true, nullsFirst: false });

  if (publicOnly) query = query.eq("public_visible", true);

  if (from) query = query.gte("starts_at", `${from}T00:00:00`);
  if (to) query = query.lte("starts_at", `${to}T23:59:59`);

  const { data, error } = await query;
  if (error) throw error;

  let rows = data || [];
  if (availableOnly && !isAVK()) {
    rows = rows.filter((row) => row.schedule_scope === "general" || row.division_id === currentDivisionId() || row.division_id === null);
  }

  if (scope === "general") rows = rows.filter((row) => row.schedule_scope === "general" || row.division_id === null);
  if (scope === "division") rows = rows.filter((row) => row.division_id === currentDivisionId() || (isAVK() && row.division_id));

  return rows;
}

async function loadInternalSchedule() {
  const tbody = $("#internalScheduleTableBody");
  tbody.innerHTML = loadingRow(6);
  try {
    const rows = await getSchedules({
      availableOnly: true,
      scope: $("#internalScheduleScopeFilter").value,
      from: $("#internalScheduleFrom").value,
      to: $("#internalScheduleTo").value,
    });
    tbody.innerHTML = rows.length ? rows.map(scheduleRow).join("") : emptyRow(6, "Записей нет.");
  } catch (error) {
    tbody.innerHTML = errorRow(6, error);
  }
}

function scheduleRow(row) {
  return `<tr>
    <td>${row.schedule_scope === "general" || !row.division_id ? "Общее" : "Подразделение"}</td>
    <td>${escapeHtml(row.divisions?.short_name || "—")}</td>
    <td>${escapeHtml(formatDateTime(row.starts_at) || row.event_date || "")}</td>
    <td>${escapeHtml(formatDateTime(row.ends_at) || "")}</td>
    <td>${escapeHtml(row.title || "")}</td>
    <td>${escapeHtml(row.description || "")}</td>
  </tr>`;
}

function openScheduleModal() {
  $("#scheduleStatus").textContent = "";
  const divisionSelect = $("#scheduleDivisionInput");
  if (!isAVK()) {
    divisionSelect.value = currentDivisionId();
    divisionSelect.disabled = true;
  } else {
    divisionSelect.disabled = false;
  }
  $("#scheduleModal").classList.remove("hidden");
}

async function submitSchedule(event) {
  event.preventDefault();
  const status = $("#scheduleStatus");
  if (!isSergeantPlus()) {
    status.textContent = "Редактировать расписание можно с сержантского состава.";
    return;
  }

  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const isGeneral = data.schedule_scope === "general";

  try {
    status.textContent = "Сохранение...";
    const { error } = await window.avkSupabase.from("schedules").insert({
      title: data.title,
      description: data.description || null,
      schedule_scope: data.schedule_scope,
      division_id: isGeneral ? null : data.division_id,
      starts_at: data.starts_at ? new Date(data.starts_at).toISOString() : null,
      ends_at: data.ends_at ? new Date(data.ends_at).toISOString() : null,
      public_visible: true,
    });
    if (error) throw error;
    await logAction("create", "schedule", null, { title: data.title });
    status.textContent = "Сохранено.";
    event.currentTarget.reset();
    $("#scheduleModal").classList.add("hidden");
    await loadInternalSchedule();
  } catch (error) {
    status.textContent = `Ошибка: ${error.message}`;
  }
}

/* Create/edit fighters */
async function saveFighterLicense(fighterId, licenseType, expiresOn) {
  if (!fighterId) return;

  const { error: deleteError } = await window.avkSupabase.from("fighter_licenses").delete().eq("fighter_id", fighterId);
  if (deleteError) throw deleteError;

  if (!licenseType || licenseType === "none") return;

  const { error } = await window.avkSupabase.from("fighter_licenses").insert({
    fighter_id: fighterId,
    license_type: licenseType,
    expires_on: expiresOn || null,
  });
  if (error) throw error;
}

function toggleLicenseExpiry(prefix) {
  const type = $(`#${prefix}LicenseType`)?.value;
  $(`#${prefix}LicenseExpiryWrap`)?.classList.toggle("hidden", !type || type === "none");
}

function openCreateFighterModal() {
  if (!isOfficerPlus()) return;
  const rankSelect = $("#rankSelect");
  if (!rankSelect?.options?.length || !rankSelect.value) fillRankSelects(state.ranks?.length ? state.ranks : DEFAULT_RANKS);
  $("#createFighterStatus").textContent = "";
  Promise.resolve(state.dictionariesPromise)
    .then(() => loadSpecializations("divisionSelect", "specializationSelect"))
    .then(() => {
      updateFighterTypeView();
      toggleLicenseExpiry("create");
      updatePreview();
      $("#createFighterModal").classList.remove("hidden");
      $("#createFighterModal").scrollTop = 0;
    });
}

function closeCreateFighterModal() {
  $("#createFighterModal").classList.add("hidden");
}

async function ensureEditableFightersLoaded() {
  const divisionId = isAVK() ? "all" : currentDivisionId();
  state.fightersCache = await getFightersForEdit(divisionId);
}

function getViewedFighterFromCaches(fighterId) {
  return (state.fightersCache || []).find((item) => item.id === fighterId)
    || (state.internalRosterRows || []).find((item) => item.id === fighterId)
    || null;
}

async function openFighterViewModal(fighterId) {
  state.currentViewedFighterId = fighterId;
  $("#fighterEditPanel").classList.add("hidden");
  $("#fighterViewStatus") && ($("#fighterViewStatus").textContent = "");

  let fighter = getViewedFighterFromCaches(fighterId);
  if (isOfficerPlus()) {
    try {
      await ensureEditableFightersLoaded();
      fighter = getViewedFighterFromCaches(fighterId) || fighter;
    } catch (error) {
      console.warn("Could not load editable fighter data:", error.message);
    }
  }

  if (!fighter) {
    alert("Боец не найден в текущем списке. Обнови состав.");
    return;
  }

  fillFighterViewModal(fighter);
  setFighterViewEditMode(false);
  $("#fighterViewModal").classList.remove("hidden");
  $("#fighterViewModal").scrollTop = 0;
  $(".fighter-view-modal", $("#fighterViewModal"))?.scrollTo?.({ top: 0, behavior: "instant" });
}

function closeFighterViewModal() {
  $("#fighterViewModal").classList.add("hidden");
  state.currentViewedFighterId = null;
  $("#fighterEditStatus").textContent = "";
}

function fillFighterViewModal(fighter) {
  $("#fighterViewTitle").textContent = fighter.full_name || fighter.account_login || "Карточка бойца";
  $("#fighterViewSubtitle").textContent = fighter.divisions?.short_name || fighter.divisions?.name || "Подразделение не указано";
  $("#fighterViewEditBtn").classList.toggle("hidden", !isOfficerPlus());

  const joined = fighter.joined_day && fighter.joined_month ? `${pad(fighter.joined_day, 3)}/${pad(fighter.joined_month, 2)}` : "—";
  const access = Array.isArray(fighter.fighter_access) ? fighter.fighter_access[0] : fighter.fighter_access;
  const role = access ? effectiveRoleLabel(access) : "—";

  $("#fighterViewInfo").innerHTML = `
    ${profileField("Боец", fighter.full_name || fighter.account_login || "—")}
    ${profileField("Звание", fighter.rank_code || "—")}
    ${profileField("Тип записи", fighter.fighter_type === "mercenary" ? "Наёмник" : "Клон")}
    ${profileField("Тип / номер", `${fighter.clone_type || "—"} ${fighter.trooper_number || "—"}`)}
    ${profileField("Дата вступления", joined)}
    ${profileField("Позывной", fighter.callsign || "—")}
    ${profileField("Подразделение", fighter.divisions?.short_name || fighter.divisions?.name || "—")}
    ${profileField("Специализация", fighter.specializations?.name || "—")}
    ${profileField("Статус", FIGHTER_STATUS_LABELS[fighter.status] || fighter.status || "—")}
    ${profileField("Роль на сайте", role)}
    <div class="profile-field"><strong>Лицензии</strong>${renderLicenses(fighter)}</div>
  `;
}

function effectiveRoleLabel(access) {
  if (access?.admin_role || access?.site_role === "admin") return "Администратор";
  return ROLE_LABELS[access?.site_role] || access?.site_role || "—";
}

async function setFighterViewEditMode(enabled, refill = false) {
  let fighter = getViewedFighterFromCaches(state.currentViewedFighterId);
  if (refill && fighter) fillFighterViewModal(fighter);

  $("#fighterEditPanel").classList.toggle("hidden", !enabled);
  $("#fighterViewEditBtn").classList.toggle("hidden", enabled || !isOfficerPlus());

  if (enabled) {
    await ensureEditableFightersLoaded();
    await fillEditFormFromSelectedFighter();
  }
}

async function createFighterThroughEdgeFunction(payload) {
  const { data, error } = await window.avkSupabase.functions.invoke("create-fighter", { body: payload });

  if (error) {
    const detailed = await extractFunctionError(error);
    throw new Error(detailed || error.message || "Edge Function returned a non-2xx status code");
  }

  if (data?.error) throw new Error(data.error);
  return data;
}

async function extractFunctionError(error) {
  try {
    const context = error?.context;
    if (!context) return error?.message || "";

    const clone = typeof context.clone === "function" ? context.clone() : context;
    const text = await clone.text();
    if (!text) return error?.message || "";

    try {
      const json = JSON.parse(text);
      return json.error || json.message || text;
    } catch {
      return text;
    }
  } catch {
    return error?.message || "";
  }
}

async function updateFighterThroughEdgeFunction(payload) {
  try {
    const { data, error } = await window.avkSupabase.functions.invoke("update-fighter", { body: payload });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return data;
  } catch (error) {
    if (!isNetworkError(error)) throw error;
    return updateFighterDirectFallback(payload);
  }
}

async function updateFighterDirectFallback(payload) {
  const fighterUpdate = {
    rank_code: payload.rank_code,
    status: payload.status,
    division_id: payload.division_id || null,
    specialization_id: payload.specialization_id || null,
  };

  const { data: fighter, error: fighterError } = await window.avkSupabase
    .from("fighters")
    .update(fighterUpdate)
    .eq("id", payload.fighter_id)
    .select("id, full_name, account_login")
    .single();
  if (fighterError) throw fighterError;

  const accessUpdate = {
    site_role: payload.site_role,
    account_status: payload.account_status,
  };
  if (isOwner()) accessUpdate.admin_role = !!payload.admin_role;

  const { error: accessError } = await window.avkSupabase
    .from("fighter_access")
    .update(accessUpdate)
    .eq("fighter_id", payload.fighter_id);
  if (accessError) throw accessError;

  await saveFighterLicense(payload.fighter_id, payload.license_type, payload.license_expires_on);
  return { ok: true, fighter_id: fighter.id, full_name: fighter.full_name, account_login: fighter.account_login };
}

async function submitCreateFighter(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const status = $("#createFighterStatus");
  const data = Object.fromEntries(new FormData(form).entries());
  const isClone = data.fighter_type === "clone";

  const payload = {
    fighter_type: data.fighter_type,
    rank_code: data.rank_code,
    clone_type: isClone ? data.clone_type : null,
    joined_day: isClone ? Number(data.joined_day) : null,
    joined_month: isClone ? Number(data.joined_month) : null,
    trooper_number: isClone ? data.trooper_number : null,
    callsign: isClone ? data.callsign : null,
    last_name: isClone ? null : (data.last_name || null),
    first_name: isClone ? null : (data.first_name || null),
    division_id: isClone ? data.division_id : null,
    specialization_id: isClone ? data.specialization_id : null,
    site_role: data.site_role,
    admin_role: data.admin_role === "true",
    account_status: data.account_status,
    license_type: data.license_type || "none",
    license_expires_on: data.license_expires_on || null,
    password: data.password,
  };

  try {
    status.textContent = "Создание...";
    const result = await createFighterThroughEdgeFunction(payload);
    await logAction("create", "fighter", result.fighter_id || null, { full_name: result.full_name, login: result.account_login });
    status.textContent = `Создан: ${result.full_name}. Логин: ${result.account_login}`;
    clearDataCache("fighters:");
    await loadInternalRoster();
    closeCreateFighterModal();
  } catch (error) {
    status.textContent = `Ошибка: ${error.message}`;
  }
}

async function loadEditFighters() {
  await ensureEditableFightersLoaded();
}

async function fillEditFormFromSelectedFighter() {
  const fighterId = state.currentViewedFighterId;
  const fighter = state.fightersCache.find((item) => item.id === fighterId);
  if (!fighter) return;

  const editRankSelect = $("#editRankSelect");
  if (!editRankSelect?.options?.length || !editRankSelect.value) fillRankSelects(state.ranks?.length ? state.ranks : DEFAULT_RANKS);
  $("#editRankSelect").value = fighter.rank_code || "PVT";
  $("#editStatusSelect").value = fighter.status || "active";
  const access = Array.isArray(fighter.fighter_access) ? fighter.fighter_access[0] : fighter.fighter_access;
  $("#editSiteRoleSelect").value = access?.site_role === "admin" ? "senior_officer" : (access?.site_role || "enlisted");
  $("#editAccountStatusSelect").value = access?.account_status || "active";
  $("#editAdminRoleSelect").value = (access?.admin_role || access?.site_role === "admin") ? "true" : "false";

  if (fighter.division_id) {
    $("#editDivisionSelect").value = fighter.division_id;
    await loadSpecializations("editDivisionSelect", "editSpecializationSelect");
  }

  if (fighter.specialization_id) $("#editSpecializationSelect").value = fighter.specialization_id;

  const license = (fighter.fighter_licenses || [])[0];
  $("#editLicenseType").value = license?.license_type || "none";
  $("#editLicenseExpiry").value = license?.expires_on || "";
  toggleLicenseExpiry("edit");

  $("#editFighterStatus").textContent = fighter.fighter_type === "mercenary"
    ? "Наёмник: подразделение и специализация не обязательны."
    : "";
}

async function submitEditFighter(event) {
  event.preventDefault();

  const status = $("#editFighterStatus");
  const fighterId = state.currentViewedFighterId;
  if (!fighterId) {
    status.textContent = "Боец не выбран.";
    return;
  }

  const fighter = state.fightersCache.find((item) => item.id === fighterId);
  const isMercenary = fighter?.fighter_type === "mercenary";

  const payload = {
    fighter_id: fighterId,
    rank_code: $("#editRankSelect").value,
    status: $("#editStatusSelect").value,
    division_id: isMercenary ? null : $("#editDivisionSelect").value,
    specialization_id: isMercenary ? null : $("#editSpecializationSelect").value,
    site_role: $("#editSiteRoleSelect").value,
    admin_role: $("#editAdminRoleSelect")?.value === "true",
    account_status: $("#editAccountStatusSelect").value,
    license_type: $("#editLicenseType").value,
    license_expires_on: $("#editLicenseExpiry").value || null,
  };

  try {
    status.textContent = "Сохраняю...";
    const result = await updateFighterThroughEdgeFunction(payload);
    await logAction("update", "fighter", fighterId, { full_name: result.full_name || fighter?.full_name });
    status.textContent = `Сохранено: ${result.full_name}`;

    clearDataCache("fighters:");
    await loadInternalRoster();
    await ensureEditableFightersLoaded();

    const updated = getViewedFighterFromCaches(fighterId);
    if (updated) fillFighterViewModal(updated);
    await setFighterViewEditMode(false);
  } catch (error) {
    status.textContent = `Ошибка: ${error.message}`;
  }
}

function updateFighterTypeView() {
  const isMercenary = $("#fighterTypeSelect")?.value === "mercenary";
  $$(".clone-only").forEach((element) => element.classList.toggle("hidden", isMercenary));
  $$(".mercenary-only").forEach((element) => element.classList.toggle("hidden", !isMercenary));
  updatePreview();
}

function updatePreview() {
  const form = $("#createFighterModal:not(.hidden) #createFighterForm") || $("#createFighterForm");
  const fighterType = form?.querySelector("#fighterTypeSelect")?.value || "clone";
  const rank = form?.querySelector("#rankSelect")?.value || "LCPL";

  if (fighterType === "mercenary") {
    const lastName = form?.querySelector("#lastNameInput")?.value.trim() || "";
    const firstName = form?.querySelector("#firstNameInput")?.value.trim() || "";
    const fullName = [rank, lastName, firstName].filter(Boolean).join(" ");

    $("#previewLogin").textContent = "MERC-xxxxxxxx — будет создан автоматически";
    $("#previewFullName").textContent = fullName || rank;
    $("#previewEmail").textContent = "будет создана автоматически";
    return;
  }

  const login = buildAccountLogin({
    clone_type: form?.querySelector("#cloneTypeInput")?.value || "CS",
    joined_day: Number(form?.querySelector("#joinedDayInput")?.value || 26),
    joined_month: Number(form?.querySelector("#joinedMonthInput")?.value || 4),
    trooper_number: form?.querySelector("#trooperNumberInput")?.value || "0186",
  });

  const callsign = form?.querySelector("#callsignInput")?.value || "Director";

  $("#previewLogin").textContent = login;
  $("#previewFullName").textContent = `${rank} ${login} ${callsign}`;
  $("#previewEmail").textContent = "будет создана автоматически";
}

/* Logs and profile */
async function logAction(actionType, entityType, entityId, details = {}) {
  if (!state.profile?.fighters?.id) return;
  try {
    await window.avkSupabase.from("activity_logs").insert({
      actor_id: state.profile.fighters.id,
      action_type: actionType,
      entity_type: entityType,
      entity_id: entityId,
      details,
    });
  } catch (error) {
    console.warn("Log write failed:", error.message);
  }
}

async function loadLogs() {
  const tbody = $("#logsTableBody");
  if (!tbody) return;
  tbody.innerHTML = loadingRow(5);

  try {
    const { data, error } = await window.avkSupabase
      .from("activity_logs")
      .select(`
        id,
        action_type,
        entity_type,
        entity_id,
        details,
        created_at,
        actors:fighters!activity_logs_actor_id_fkey (full_name, account_login)
      `)
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw error;

    tbody.innerHTML = data?.length ? data.map(logRow).join("") : emptyRow(5, "Логов пока нет.");
  } catch (error) {
    tbody.innerHTML = errorRow(5, error);
  }
}

function logRow(row) {
  return `<tr>
    <td>${escapeHtml(formatDateTime(row.created_at))}</td>
    <td>${escapeHtml(row.actors?.full_name || row.actors?.account_login || "—")}</td>
    <td>${escapeHtml(ACTION_LABELS[row.action_type] || row.action_type || "")}</td>
    <td>${escapeHtml(ENTITY_LABELS[row.entity_type] || row.entity_type || "")}</td>
    <td class="log-details">${escapeHtml(JSON.stringify(row.details || {}, null, 2))}</td>
  </tr>`;
}

function loadMePage() {
  const box = $("#meInfoBox");
  const fighter = state.profile?.fighters;
  if (!box || !fighter) return;

  const joined = fighter.joined_day && fighter.joined_month ? `${pad(fighter.joined_day, 3)}/${pad(fighter.joined_month, 2)}` : "—";
  const licenses = renderLicenses(fighter);
  $("#meRoleBadge").textContent = ROLE_LABELS[effectiveSiteRole()] || effectiveSiteRole();

  box.innerHTML = `
    ${profileField("Боец", fighter.full_name || fighter.account_login || "—")}
    ${profileField("Звание", fighter.rank_code || "—")}
    ${profileField("Тип / номер", `${fighter.clone_type || "—"} ${fighter.trooper_number || "—"}`)}
    ${profileField("Дата вступления", joined)}
    ${profileField("Позывной", fighter.callsign || "—")}
    ${profileField("Специализация", fighter.specializations?.name || "—")}
    ${profileField("Подразделение", fighter.divisions?.short_name || fighter.divisions?.name || "—")}
    <div class="profile-field"><strong>Лицензии</strong>${licenses}</div>
  `;
}

function profileField(title, value) {
  return `<div class="profile-field"><strong>${escapeHtml(title)}</strong>${escapeHtml(value)}</div>`;
}

/* Formatting */
function formatDateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString("ru-RU", { dateStyle: "short", timeStyle: "short" });
}

function loadingRow(colspan) {
  return `<tr><td colspan="${colspan}">Загрузка...</td></tr>`;
}

function emptyRow(colspan, message) {
  return `<tr><td colspan="${colspan}">${escapeHtml(message)}</td></tr>`;
}

function errorRow(colspan, error) {
  return `<tr><td colspan="${colspan}">Ошибка: ${escapeHtml(error.message)}</td></tr>`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
