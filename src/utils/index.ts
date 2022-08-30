const slugname = (slug: string) => slug.replace(/\s+/g, "-").toLowerCase();
const filename = (file: any) => file.filename;

// export
export { slugname, filename };
