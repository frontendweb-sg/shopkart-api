const slugname = (slug: string) => slug.replace(/\s+/g, "-").toLowerCase();
const filename = (file: any) => file.filename;

const increaseOrder = <T>(items: T[]) => {
	if (items.length === 0) return;
	const orders = items.map((item: any) => item.order);
	return orders ? orders[orders.length - 1] + 1 : 1;
};
// export
export { slugname, filename, increaseOrder };
