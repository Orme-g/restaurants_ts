//React Hook Form

import { useForm } from "react-hook-form";

const ReactHookForm = () => {
    const values = async () => await fetch("api"); // получение данных формы с сервера
    const {
        register,
        handleSubmit,
        watch, // Отслеживание данных ввода
        formState: { errors },
    } = useForm({
        criteriaMode: "firstError", // Объект ошибки будет содержать только первую ошибку или все ошибки 'all'
        mode: "onSubmit", // Когда происходит валидация. По умолч onSubmit. Варианты: onBlur/onChange/onTouched/all
        defaultValues: {
            // Значения по умолчанию полей формы. Рекомендуется заполнять для всех полей. Не исп undefined
            name: "",
            surname: "",
        },
        values, // Значения полей, получаемые извне. Обновит значения полей, когда переменная values будет обновлена данными с сервера и тд
    });

    console.log(watch("name")); // Вывод в консоль данных поля из ввода name

    const onSubmit = () => {
        console.log("Form submitted!");
    };

    const validation = (value) => {
        return `Validation function for ${value}`;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Хендлер провалидирует перед выполнением onSubmit */}
            <input
                {...register("name", {
                    onChange: (e) => {
                        // Выполнить функцию при изменении поля onChange. Ещё есть onBlur (уход фокуса с поля)
                        console.log(e.target.value);
                    },
                    validate: {
                        // Кастомная валидация, принимает колбэк или объект колбэков
                        valueOne: (value) => value === "1" || "Not to be 1",
                        positive: (value) => value > 0 || "To be positive",
                        funcValid: (value) => validation(value),
                    },
                    // Регистрация поля с названием name
                    required: "Enter name", // Поле не должно быть пустым
                    minLength: 2, // Минимальное количество символов 2
                    // Валидации: required/min(число)/max(число)/minLength/maxLength/pattern(шаблон RegExp)/validate
                    maxLength: {
                        // Валидация с кастомным сообщением
                        value: 30,
                        message: "Not more than 30 symbols",
                    },
                })}
                aria-invalid={errors.name ? true : false}
            />
            {errors.name && <span>Error text</span>} {/* Вывод текста, если присутствует ошибка */}
            <input />
            <button type="submit">Submit</button>
        </form>
    );
};

export default ReactHookForm;
