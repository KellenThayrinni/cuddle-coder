export interface Announcement {
  id: string;
  icon: string;
  title: string;
  text: string;
  showPopupOnLogin: boolean;
  createdAt: string;
}

const STORAGE_KEY = "crieoferta_announcements";
const SEEN_KEY = "crieoferta_seen_announcements";
const POPUP_SEEN_KEY = "crieoferta_popup_seen";

export const getAnnouncements = (): Announcement[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveAnnouncements = (items: Announcement[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const addAnnouncement = (item: Omit<Announcement, "id" | "createdAt">): Announcement => {
  const announcements = getAnnouncements();
  const newItem: Announcement = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  announcements.unshift(newItem);
  saveAnnouncements(announcements);
  return newItem;
};

export const updateAnnouncement = (id: string, data: Partial<Omit<Announcement, "id" | "createdAt">>) => {
  const announcements = getAnnouncements();
  const idx = announcements.findIndex((a) => a.id === id);
  if (idx !== -1) {
    announcements[idx] = { ...announcements[idx], ...data };
    saveAnnouncements(announcements);
  }
};

export const removeAnnouncement = (id: string) => {
  saveAnnouncements(getAnnouncements().filter((a) => a.id !== id));
};

export const getSeenIds = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(SEEN_KEY) || "[]");
  } catch {
    return [];
  }
};

export const markAsSeen = (id: string) => {
  const seen = new Set(getSeenIds());
  seen.add(id);
  localStorage.setItem(SEEN_KEY, JSON.stringify([...seen]));
};

export const getUnseenCount = (): number => {
  const seen = new Set(getSeenIds());
  return getAnnouncements().filter((a) => !seen.has(a.id)).length;
};

export const getPopupSeenIds = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(POPUP_SEEN_KEY) || "[]");
  } catch {
    return [];
  }
};

export const markPopupSeen = (id: string) => {
  const seen = new Set(getPopupSeenIds());
  seen.add(id);
  localStorage.setItem(POPUP_SEEN_KEY, JSON.stringify([...seen]));
};

export const getLoginPopupAnnouncements = (): Announcement[] => {
  const popupSeen = new Set(getPopupSeenIds());
  return getAnnouncements().filter((a) => a.showPopupOnLogin && !popupSeen.has(a.id));
};

export const ADMIN_EMAIL = "admin@gmail.com";

export const ICON_OPTIONS = [
  "🎉", "🚀", "⚡", "🔥", "✨", "💡", "📢", "🎯", "💎", "🌟",
  "🛠️", "📦", "🎨", "📣", "🔔", "💬", "❤️", "🏷️", "📌", "🆕",
];
