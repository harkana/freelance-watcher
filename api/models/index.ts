import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class RootEntity {

    @Column()
    createdAt?: Date;

    @Column()
    updatedAt?: Date;

    @BeforeInsert()
    createDate() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    updateDate() {
        this.updatedAt = new Date();
    }

}

@Entity({
    name: "platform"
})
export class PlatformSource extends RootEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column()
    link: string

    @OneToMany(_ => Offer, offer => offer.platform, {
        lazy: true,
        cascade: ["insert", "update"]
    })
    offers?: Array<Offer>;

    @OneToMany(_ => CronTask, cronTask => cronTask.platform, {
        lazy: true,
        cascade: ["insert", "update"]
    })
    tasks?: Array<CronTask>;

}

@Entity({
    name: "offer"
})
export class Offer extends RootEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price?: string;

    @Column()
    place?: string;

    @Column()
    startTime?: Date;

    @Column()
    duration?: number;

    @Column()
    link: string;

    @Column()
    targetId: string;

    @JoinColumn({
        name: "platformId",
        referencedColumnName: "id"
    })
    @ManyToOne(_ => PlatformSource, platform => platform.offers, {
        eager: true,
        cascade: true
    })
    platform?: PlatformSource;

}

@Entity({
    name: "user"
})
export class User extends RootEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    pseudo: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(_ => CronTask, task => task.user, {
        lazy: true
    })
    tasks?: Array<CronTask>;

}

@Entity({
    name: "cron_task"
})
export class CronTask extends RootEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @JoinColumn({
        name: "platformId",
        referencedColumnName: "id"
    })
    @ManyToOne(_ => PlatformSource, platform => platform.tasks, {
        eager: true,
        cascade: true
    })
    platform?: PlatformSource;

    @JoinColumn({
        name: "userId",
        referencedColumnName: "id"
    })
    @ManyToOne(_ => User, user => user.tasks, {
        eager: true,
        cascade: true
    })
    user: User;

    @OneToMany(_ => CronTaskKeywords, cronTaskKeywords => cronTaskKeywords.cronTask, {
        lazy: true,
        cascade: ["insert", "update"]
    })
    cronTaskKeywords?: Array<CronTaskKeywords>;

}

@Entity({
    name: "cron_task_keywords"
})
export class CronTaskKeywords extends RootEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @JoinColumn({
        name: "cronTaskId",
        referencedColumnName: "id"
    })
    @ManyToOne(_ => CronTask, cronTask => cronTask.cronTaskKeywords, {
        cascade: true,
        eager: true
    })
    cronTask?: CronTask;

    @Column()
    keyword: string;

}