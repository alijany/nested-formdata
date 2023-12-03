import { isArray, isDate, isObject } from 'lodash'

type BasicType = string | boolean | number | File

type DataObj<T> =
 | BasicType[]
 | {
    [P in keyof T]: BasicType | BasicType[] | DataObj<T>
   }

export function objectToFormData<
 T extends {
  [key: string | number]: unknown
 }
>(obj: DataObj<T>, form?: FormData, namespace?: string): FormData {
 const formData = form || new FormData()

 const isArr = isArray(obj)

 for (const key in obj) {
  const property = obj[key]
  if (!obj.hasOwnProperty(key) || !property) {
   continue
  }

  const formKey = namespace ? (isArr ? namespace : `${namespace}[${key}]`) : key

  if (isDate(property)) {
   formData.append(key, property.toISOString())
  } else if (property instanceof File) {
   formData.append(formKey, property)
  } else if (!isObject(property)) {
   formData.append(formKey, property.toString())
  } else if (isObject(property)) {
   objectToFormData(property, formData, key)
  }
 }

 return formData
}
