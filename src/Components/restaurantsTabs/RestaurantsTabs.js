import { useState } from 'react'

import { Box, Tab } from '@mui/material'
import {TabContext, TabList, TabPanel} from '@mui/lab'

import FeedbackItem from '../feedbackItem/FeedbackItem'
import './restaurantsTabs.sass'

const RestaurantsTabs = () => {

    const [activeTab, setActiveTab] = useState('1')

    const handleChange = (event, newActiveTab) => {
        setActiveTab(newActiveTab)
    }

    return (
        <div className="restaurants-tabs__container">
            <Box sx={{ width: '100%' }}>
        <TabContext value={activeTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="Restaurant Tabs">
            <Tab label="О Ресторане" value="1" />
            <Tab label="Меню" value="2" />
            <Tab label="Отзывы" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <div className="restaurants-tabs__description">
            Ресторан "Лакомкин" приглашает вас на незабываемое гастрономическое путешествие. Наш ресторан - это место, где сочетаются превосходный сервис, уютная атмосфера и великолепная кухня. <br />
            Наше меню разнообразно и сбалансировано, предлагая блюда для самых взыскательных гурманов. У нас вы найдете классические мясные и рыбные блюда, овощные деликатесы, фирменные десерты и многое другое. Все блюда готовятся с использованием только свежих и качественных ингредиентов. <br />
            Наша команда талантливых шеф-поваров стремится к совершенству в каждом блюде. Они экспериментируют с текстурами, вкусами и ароматами, чтобы создавать настоящие шедевры кулинарии. Мы также рады приветствовать вегетарианцев и предлагаем широкий выбор вегетарианских и веганских блюд. <br />
            Наши стильные и уютные залы создают идеальную атмосферу для отдыха и наслаждения. Вежливый и профессиональный персонал всегда готов предложить вам внимательное обслуживание и помочь с выбором блюд или винного сопровождения.
            Кроме того, мы предлагаем возможность проведения мероприятий и приватных вечеринок в нашем ресторане. Празднуйте свои особые события с нами и наслаждайтесь высоким уровнем обслуживания. <br />
            Не забудьте посетить наш бар, где вы сможете насладиться широким выбором коктейлей, виски, вин и других алкогольных напитков. <br />
            Мы стремимся создать незабываемый опыт для каждого гостя, сочетая кулинарное искусство, изысканный дизайн и превосходное обслуживание. Приходите в ресторан "Лакомкин" и насладитесь поистине уникальным и гастрономическим опытом.
            </div>
        </TabPanel>
        <TabPanel value="2">
            <div className="restaurants-tabs__menu">
            <a href="https://ginza.ru/assets/files/20230913/27e44e1ecbae742adbd450c1b16df731.pdf">
                Перейти для просмотра меню
            </a>
            </div>
            <div className='grid-container'>
                <div className="grid-elem">1</div>
                <div className="grid-elem">2</div>
                <div className="grid-elem">3</div>
                <div className="grid-elem">4</div>
                <div className="grid-elem">5</div>
                <div className="grid-elem">6</div>
                <div className="grid-elem">7</div>
                <div className="grid-elem">8</div>
                <div className="grid-elem">9</div>
                <div className="grid-elem">10</div>
            </div>
        </TabPanel>
        <TabPanel value="3">
            <FeedbackItem/>
        </TabPanel>
      </TabContext>
    </Box>
        </div>
        
    )
}

export default RestaurantsTabs