type BasicType = string | boolean | number | File | undefined | null;

type DataObj<T> =
	| BasicType[]
	| {
		[P in keyof T]: BasicType | BasicType[] | Partial<DataObj<T>>;
	};

export function objectToFormData<
	T extends {
		[key: string | number]: unknown;
	}
>(obj: DataObj<T> | Partial<T>, form?: FormData, namespace?: string): FormData {
	const formData = form || new FormData();

	const isArr = Array.isArray(obj);

	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const property = obj[key];
			if (!property) {
				continue;
			}

			const formKey = namespace ? (isArr ? namespace : `${namespace}[${key}]`) : key;

			if (property instanceof Date) {
				formData.append(formKey, property.toISOString());
			} else if (property instanceof File) {
				formData.append(formKey, property);
			} else if (typeof property !== 'object') {
				formData.append(formKey, property.toString());
			} else {
				objectToFormData(property, formData, formKey);
			}
		}
	}

	return formData;
}